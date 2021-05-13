'use strict';
const nodemailer = require('nodemailer');

async function sendMail(message) {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMail,
};
