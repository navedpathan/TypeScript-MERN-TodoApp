import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  text: string;
}

const todoSchema: Schema = new Schema({
  text: String,
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
