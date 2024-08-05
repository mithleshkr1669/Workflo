import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import cors from "cors";
import { users } from "./Database/model/user.js";
import mongoose from "mongoose";
// import session from "express-session";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
import { Task } from "./Database/model/taskSchema.js";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())



const saltRounds = 10;



async function dbConnection() {
  return mongoose.connect(
    "mongodb+srv://ava604218:Sudhirkr@cluster0.hfdq0or.mongodb.net/workflo?retryWrites=true&w=majority&appName=Cluster0"
  );
}

const secretkey = "sudhirKr";


app.post("/signup", async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    await dbConnection();
    console.log("mongodb is connected successfully");
    const user = await users.create({
      FullName: fullName,
      email: email,
      password: hashedPassword,
    });
    console.log("this is user", user);
    const userEmail = await users.findOne({ email: email });

    console.log("try to get user email:", userEmail.email)
    const token = jwt.sign({userEmail: userEmail.email }, secretkey, { expiresIn: "2h" })
    console.log("this is your token",token)
    res.cookie("email", token)
    return res.status(201).json({ msg: "successful" });

  } catch (error) {
    console.log("mongo is not connected successfully:", error);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email", email, "password", password);

  try {
    await dbConnection();

    const result = await users.findOne({ email: email });
    console.log("this is existing email", result);
    const storedHashedPassword = result.password;
    console.log("storesHashedPassword", storedHashedPassword);
    const isAuth = await bcrypt.compare(password, storedHashedPassword);
    console.log("password is found", isAuth);
    if (isAuth) {
      const token = jwt.sign({userEmail: result.email }, secretkey, { expiresIn: "2h" })
     console.log("this is your token",token)
     res.cookie("email", token)
    return res.status(201).json({ msg: "successful" });
    }
  } catch (error) {
    console.log("Cannot able to find data", error);
  }
});

app.post("/taskData", async (req, res) => {
  const title = req.body.title;
  const status = req.body.status.data;
  const priority = req.body.priority;
  const deadline = req.body.deadline;
  const description = req.body.description
  
  console.log("title:",title,"status:",status,"priority:",priority,"deadline:",deadline,"description:",description)

  try {
    await dbConnection();

    console.log("mongodb is successfully connected")
   
    const cookieToken = req.cookies.email
    // console.log("this is cookie from client",cookieToken )

    const results = jwt.verify(cookieToken, secretkey);
    // console.log("jwt verify result",results)

    console.log("user id", results.userEmail)
    
   
    const result = await Task.create({
      title: title,
      status: status,
      priority: priority,
      deadline: deadline,
      description: description,
      userEmail: results.userEmail
    });
    // console.log("task data fetched successfully", result);
    const userIdFromCookie = results.user_id; // Assuming this is how you get the user ID


    // const taskResult = Task.find({ user_id: userIdFromCookie });

    // console.log("this is taskResult", taskResult)

    Task.aggregate([
      {
        $match: {
          userEmail: results.userEmail
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      }
    ]).exec().then((result) =>res.json(result)).catch((error)=>console.log("error in getting task",error));

  } catch (error) {
    console.log("error in getting task data", error);
  }
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
