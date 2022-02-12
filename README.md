# Task-App-Server

<p align="center">
  <img alt="tasked" src=".github/logo.svg" width="25%">
</p>

<h2 align="center">
  This is the backend for a task/to-do app that was develop using NodeJS, Express and MongoDB.
</h2>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/areasflavio/task-app-server.svg">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/areasflavio/task-app-server.svg">
  
  <a href="https://github.com/areasflavio/task-app-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/areasflavio/task-app-server.svg">
  </a>
</p>

<p align="center">
  <a href="#star-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer-API-Reference">API Reference</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#keyboard-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer_mouse-installation">Installation</a>
</p>

# :star: Features

[(Back to top)](#Task-App-Server)

This is a complete application for a task/to-do app. You can create your account,
and start following your tasks.

The main actions as create, update and delete are implemented for users and tasks.

Some key features are:

- Password are encrypted with Bcrypt package.
- Authenticated routes using JWT Token.
- Codebase is cover by tests with Jest and supertest.
- Avatar upload for your user.
- Email service for welcome and goodbye messages are connected using Nodemailer.

The application is built using Node.JS with Express framework. The database is
the MongoDB. The entire codebase is written using Javascript.

<p align="center">
  Checkout the <a href="https://areasflavio-task-app.herokuapp.com">API Live version</a>
   hosted on:
</p>
<p align="center">
    <img alt="Heroku" src="https://img.shields.io/badge/heroku-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

<p align="center">
  You also can check the complete <a href="https://tasked.vercel.app">Application Live version</a>
  hosted on:
</p>
<p align="center">
    <img alt="Vercel" src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

<br/>

> The email service I used suspends the KEY if don't use it regularly, so if you
> don't get any emails it's because of that.

<br/>

# :computer: API-Reference

[(Back to top)](#Task-App-Server)

### Get welcome message

```http
  GET /
```

## Users

### Create a user

```http
  POST /users
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. Name of the user     |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |

### Login with a user

```http
  POST /users/login
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |

### Get a user avatar

```http
  GET /users/:id/avatar
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Id of the user |

<br/>

> All next routes need authentication!

<br/>

### Logout with current user

```http
  POST /users/logout
```

### Logout for all places with current user

```http
  POST /users/logoutAll
```

### Get current user info

```http
  GET /users/me
```

### Update current user

```http
  PATCH /users/me
```

| Body       | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `name`     | `string` | **Optional**. New name of the user     |
| `email`    | `string` | **Optional**. New email of the user    |
| `password` | `string` | **Optional**. New password of the user |

### Delete current user

```http
  DELETE /users/me
```

### Add avatar for current user

```http
  POST /users/me/avatar
```

| Body     | Type   | Description                                |
| :------- | :----- | :----------------------------------------- |
| `avatar` | `file` | **Required**. Image file for use as avatar |

### Get current user avatar

```http
  GET /users/me/avatar
```

### Delete current user avatar

```http
  DELETE /users/me/avatar
```

## Tasks

### Create a task

```http
  POST /tasks
```

| Body          | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `description` | `string` | **Required**. Description of the task |

### Get all the current user tasks

```http
  GET /tasks
```

### Get the details of a task

```http
  GET /tasks/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Id of the task |

### Update a existing task

```http
  PATCH /tasks/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the task |

| Body          | Type     | Description                                |
| :------------ | :------- | :----------------------------------------- |
| `description` | `string` | **Optional**. New description for the task |
| `completed`   | `string` | **Optional**. Set task as completed        |

### Delete a existing task

```http
  DELETE /tasks/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the task |

<br/>

# :keyboard: Technologies

[(Back to top)](#Task-App-Server)

This is what i used and learned with this project:

- [x] Node.JS
- [x] Express
- [x] MongoDB
- [x] Mongoose
- [x] JWT
- [x] Bcrypt
- [x] Multer
- [x] Nodemailer
- [x] Jest
- [x] Supertest
- [x] Javascript

<br/>

# :computer_mouse: Installation

[(Back to top)](#Task-App-Server)

To use this project, first you need NodeJS and MongoDB running in your device,
the mail service is optional, then you can follow the commands below:

```bash
# Clone this repository
git clone https://github.com/areasflavio/task-app-server.git

# Go into the repository
cd task-app-server

# Install dependencies for the backend
npm install

# Copy the .env.example to the .env file and inject your credentials
cp .env.example .env

# To start the express development server, run the following command
npm run dev
```

# :memo: License

[(Back to top)](#Task-App-Server)

This project is under the MIT license. See the [LICENSE](https://github.com/areasflavio/task-app-server/blob/main/LICENSE) for more information.

# :man_technologist: Author

[(Back to top)](#Task-App-Server)

Build by Flávio Arêas 👋 [Get in touch!](https://www.linkedin.com/in/areasflavio/)
