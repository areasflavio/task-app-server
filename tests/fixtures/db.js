const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/User');
const Task = require('../../src/models/Task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Flávio9',
  email: 'vflavio9@gmail.com',
  password: '123456',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Flávio8',
  email: 'vflavio8@gmail.com',
  password: '123456',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test task',
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test user',
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'test app',
  completed: false,
  owner: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  setupDatabase,
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
};
