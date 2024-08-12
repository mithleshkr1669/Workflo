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
import dotenv from 'dotenv';
import nodemailer from "nodemailer"
import cron from "node-cron"

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())



const saltRounds = 10

const usrname = process.env.USERNAMEs;
const password=process.env.PASSWORD

async function dbConnection() {
  return mongoose.connect(
    "mongodb+srv://"+usrname+":"+password+"@cluster0.hfdq0or.mongodb.net/workflo?retryWrites=true&w=majority&appName=Cluster0"
  );
}

const secretkey = process.env.SECRETKEY;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS  // Your Gmail password or App Password
  }
});



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
      const token = jwt.sign({ userEmail: result.email }, secretkey, { expiresIn: "2h" })
      console.log("this is your token", token)
      res.cookie("email", token)
      return res.status(201).json({ msg: "successful" });
    }
  } catch (error) {
    console.log("Cannot able to find data", error);
  }
});

app.post("/taskData", async (req, res) => {
  const title = req.body.title;
  const status = req.body.status;
  console.log("this is status", status)
  const priority = req.body.priority;
  const deadline = req.body.deadline;
  const description = req.body.description
  
  console.log("title:",title,"status:",status,"priority:",priority,"deadline:",deadline,"description:",description)

  try {
    await dbConnection();

    console.log("mongodb is successfully connected")
   
    const cookieToken = req.cookies.email
    console.log("this is cookie from taskData",cookieToken )

    const results = jwt.verify(cookieToken, secretkey);
    console.log("jwt verify result",results)

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
    const userIdFromCookie = results.user_id;

  } catch (error) {
    console.log("error in getting task data", error);
  }
});

app.get("/getAllTask", async (req, res) => {
  let taskResults;
  const cookieToken = await req.cookies.email
    console.log("this is cookie from getAllTask",cookieToken )

    const results = jwt.verify(cookieToken, secretkey);
  try {
    await dbConnection();
    
    // console.log("jwt verify result",results)

   
    console.log("user email", results.userEmail)
    taskResults = await Task.aggregate([
      {
        $match: {
          userEmail: results.userEmail
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userEmail",
          foreignField: "email",
          as: "user"
        }
      }
    ]).exec();
    res.json(taskResults)
  } catch (error) {
    console.log("error in fetching data", error)
  }
  const date = new Date();
    // console.log("this is date", date)
    const formattedDate = date.toLocaleDateString('en-US');
    // console.log("formatDate", formattedDate)
    const [month, day, year] = formattedDate.split('/');

    // Convert to ISO format (YYYY-MM-DD)
  const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  const anyDataBeforeDeadline = await Task.find({userEmail:results.userEmail,deadline:{$gte:isoDate}})
  console.log("any data before deadline", anyDataBeforeDeadline)
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender address
    to: results.userEmail,                       // Recipient address
    subject: "You have pending task",             // Subject line
    text: "Please visit website to see pending tasks. click here",                   // Plain text body
    // html: html                    // HTML body (optional)
  };
  if (anyDataBeforeDeadline) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
  });
  }


});


// })

app.delete("/:id", async(req, res) => {
  const { id } = req.params
  console.log("this is deleting id", id)
  try {
    await Task.findByIdAndDelete(id)
    console.log("successfully delete")
  } catch (error) {
    console.log("error in deleting in backend", error)
 }
})

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
