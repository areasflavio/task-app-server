const express = require('express');

const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', authMiddleware, async (req, res) => {
  const { description, completed } = req.body;
  const owner = req.user;

  try {
    const task = new Task({ description, completed, owner });

    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch('/tasks/:id', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
