const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

const userOne = {
  name: 'Flávio',
  email: 'vflavio9@gmail.com',
  password: '123456',
};

beforeEach(async () => {
  await User.deleteMany();

  await new User(userOne).save();
});

test('should sign up a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      email: 'areasflavio@outlook.com',
      password: '123456',
    })
    .expect(201);
});

test('should login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test('should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'NOTvflavio9@gmail.com',
      password: '123456',
    })
    .expect(400);
});