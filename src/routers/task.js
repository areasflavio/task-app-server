const express = require('express');

const Task = require('../db/models/Task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const { description, completed } = req.body;

  try {
    const task = new Task({ description, completed });

    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const task = await Task.findById(id);

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
