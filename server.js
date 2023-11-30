const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb+srv://user123:user123@cluster0.yxtsfes.mongodb.net/ToDo', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Todo Schema
const todoSchema = new mongoose.Schema({
    text: String,
    priority: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(cors());
app.use(express.json());

// CRUD operations

// Get all todos
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
    const { text, priority } = req.body;
    const todo = new Todo({ text, priority });
    await todo.save();
    res.json(todo);
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, priority } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { text, priority }, { new: true });
    res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
