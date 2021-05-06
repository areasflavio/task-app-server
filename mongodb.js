const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('tasks').insertMany(
      [
        {
          description: 'Update Github',
          completed: true,
        },
        {
          description: 'Send project to Github',
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable to insert documents.');
        }

        console.log(result.ops);
      }
    );
    db.collection('tasks').findOne(
      { _id: new ObjectID('60947abe78e5b2b7d9336982') },
      (error, task) => {
        if (error) {
          return console.log('Unable to fetch task.');
        }

        console.log(task);
      }
    );
    db.collection('tasks')
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log('Unable to fetch tasks.');
        }

        console.log(tasks);
      });

    db.collection('tasks')
      .updateMany(
        { completed: false },
        {
          $set: { completed: true },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection('tasks')
      .deleteOne({ description: 'Update Github' })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
