require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(
  cors({
    origin: 'https://tasked.vercel.app',
  })
);
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

module.exports = app;
