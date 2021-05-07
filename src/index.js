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

app.post('/tasks', (req, res) => {
  const { description, completed } = req.body;

  const task = new Task({ description, completed });

  task
    .save()
    .then(() => {
      return res.status(201).json(task);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
