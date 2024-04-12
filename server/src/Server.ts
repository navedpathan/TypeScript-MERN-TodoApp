import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db";
import Todo, { ITodo } from "./model";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.get("/api/todos", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/todos", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    const newTodo = await todo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
