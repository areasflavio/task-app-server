const mongoose = require('mongoose');
const validator = require('validator').default;

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if (
        validator.contains(value, 'password', {
          ignoreCase: true,
        })
      ) {
        throw new Error("Password can not contain the word 'password'.");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.');
      }
    },
  },
});

module.exports = User;
