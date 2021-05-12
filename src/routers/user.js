const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'images'),
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpe?g|png)$/gm)) {
      return cb(new Error('Please upload a image.'));
    }

    cb(undefined, true);
  },
  storage: multer.memoryStorage(),
});

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  try {
    await user.save();

    const token = await user.generateAuthToken();

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    return res.json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();

    return res.json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post(
  '/users/me/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;

    await req.user.save();

    return res.json();
  },
  (error, req, res, next) => {
    return res.status(400).json({ error: error.message });
  }
);

router.delete('/users/me/avatar', authMiddleware, async (req, res) => {
  req.user.avatar = undefined;

  await req.user.save();

  return res.json();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');

    return res.send(user.avatar);
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
