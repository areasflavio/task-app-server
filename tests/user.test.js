const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/User');

const { setupDatabase, userOne, userOneId } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      email: 'areasflavio@outlook.com',
      password: '123456',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Flávio',
      email: 'areasflavio@outlook.com',
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe('123456');
});

test('should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'NOT_vflavio9@gmail.com',
      password: '123456',
    })
    .expect(400);
});

test('should get profile user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('should upload a avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/avatar.png')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Flávio Augusto',
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Flávio Augusto');
});

test('should not update unauthenticated user', async () => {
  await request(app)
    .patch('/users/me')
    .send({
      name: 'Flávio Augusto',
    })
    .expect(401);
});

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Brazil',
    })
    .expect(400);
});
