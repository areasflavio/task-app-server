require('dotenv').config();
const express = require('express');

require('./db/mongoose');

const User = require('./db/models/User');
const Task = require('./db/models/Task');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  user
    .save()
    .then(() => {
      return res.status(201).json(user);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post('/tasks', async (req, res) => {
  const { description, completed } = req.body;

  try {
    const task = new Task({ description, completed });

    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const count = await Task.countDocuments({ completed: false });
    console.log(count);

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
