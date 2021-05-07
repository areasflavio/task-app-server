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

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      return res.json(users);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    })
    .catch((error) => {
      return res.status(500).json(error);
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
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      return res.json(tasks);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.json({ task });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      console.log(task);

      return Task.countDocuments({ completed: false });
    })
    .then((result) => {
      console.log(result);

      return res.json();
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});
