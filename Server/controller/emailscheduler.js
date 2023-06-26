const sendEmail = require('../utils/sendEmail');
const cron = require("node-cron");

const scheduleEmail = {
  scheduler: async (req, res) => {
    try {
      const { email } = req.query;
      const mailOptions = {
        from: process.env.USER,
        to: "jeshmi.r@arbyte.com.np",
        subject: "About returning the book that you have borrowed",
        html: "<p>Return book</p>"
      };

      cron.schedule('*/15 * * * *', async () => {
        try {
          await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);
          console.log("Email sent successfully");
        } catch (err) {
          console.log("Error sending email:", err);
        }
      });
      res.status(200).json("Email will be sent after 15 minutes");
    } catch (err) {
      console.log("Error:", err);
    }
  }
};

module.exports = scheduleEmail;
