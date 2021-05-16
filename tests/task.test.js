const request = require('supertest');

const app = require('../src/app');
const Task = require('../src/models/Task');

const { setupDatabase, userOne, userTwo, taskOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'test node app',
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('should fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test('should fetch user tasks by id', async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body._id)).toStrictEqual(
    JSON.stringify(taskOne._id)
  );
});

test('should not fetch user tasks by id for unauthenticated user', async () => {
  await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
});

test('should not fetch task by id from another user', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

test('should fetch only completed tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=true`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0]).toMatchObject({
    completed: true,
  });
});

test('should fetch only incomplete tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=false`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0]).toMatchObject({
    completed: false,
  });
});

test('should delete user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
});

test('should not delete task from another user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

test('should update user task', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      completed: true,
    })
    .expect(200);

  expect(response.body).toMatchObject({
    completed: true,
  });
});

test('should not update task from another user', async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      completed: true,
    })
    .expect(404);
});
