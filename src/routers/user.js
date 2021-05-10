const express = require('express');

const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  try {
    await user.save();

    const token = await user.generateAuthToken();

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/users/me', authMiddleware, async (req, res) => {
  return res.json(req.user);
});

router.patch('/users/me', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    return res.json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();

    return res.json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
