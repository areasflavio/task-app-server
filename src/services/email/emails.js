const welcomeEmail = (email, name) => ({
  to: email,
  from: process.env.MAIL_ADDRESS,
  subject: 'Thanks for joining in!',
  text: `Welcome to the app, ${name}.\nLet me know how you get along with the app.\n\nTeam Task App`,
});

const cancellationEmail = (email, name) => ({
  to: email,
  from: process.env.MAIL_ADDRESS,
  subject: 'Sorry to see you go...',
  text: `I hope that we see you again soon, ${name}.\n\nTeam Task App`,
});

module.exports = {
  welcomeEmail,
  cancellationEmail,
};
