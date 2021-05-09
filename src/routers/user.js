const express = require('express');

const User = require('../db/models/User');

const router = new express.Router();

router.post('/users', (req, res) => {
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

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
