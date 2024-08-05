import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
      },
      
      status: {
        type: String,
        enum: ['To Do', 'Under Review', 'In Progress', 'Finished'],
        required: [true, 'Task status is required'],
  },
  priority: {
    type: String,
    
  },
  deadline: {
    type:String
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
  },
  userEmail: {
    type:String,
    ref: 'users',
    required:true
  },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
})
export const Task=mongoose.models.Tasks || mongoose.model("Tasks",taskSchema)
