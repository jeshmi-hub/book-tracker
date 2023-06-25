const sendEmail = require('../utils/sendEmail');
const cron = require("node-cron");

const scheduleEmail = {
  scheduler:
   async (req, res) => {
    const { email } = req.query;
    try {
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "About returning the book that you have borrowed",
        html: "<p>Return book</p>"
      }

      await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);

    } catch (err) {
      throw new Error(err.message);
    }

    cron.schedule("* * * * *", () => {
      task();
    });
  }
}

const task = () => {
  console.log("Running a task every minute");
}

module.exports = scheduleEmail;
