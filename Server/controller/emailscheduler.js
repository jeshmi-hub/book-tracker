const sendEmail = require('../utils/sendEmail');
const cron = require("node-cron");
const db = require("../models");
const BookBorrow = db.bookBorrow;

const scheduleEmail = {
  scheduler: async (req, res) => {
    try {
      const { id } = req.params;
      const bookBorrow = await BookBorrow.findOne({
        where: {bookId: id},
      })
      
    
      if (!bookBorrow) {
        return res.status(404).json({ error: 'Book borrow not found' });
      }

      const { email: bookBorrowEmail, createdAt } = bookBorrow;

      const mailOptions = {
        from: process.env.USER,
        to: bookBorrowEmail, // Use the book borrower's email from the model
        subject: 'About returning the book that you have borrowed',
        html: '<p>Return book</p>',
      };

      const currentDate = new Date();
      const borrowDate = new Date(createdAt);
      borrowDate.setDate(borrowDate.getDate() + 15); 
  
      
      const timeDifference = borrowDate.getTime() - currentDate.getTime();
  
      
      if (timeDifference > 0) {
        const cronPattern = `*/${Math.floor(timeDifference / 1000)} * * * *`; 
        cron.schedule(cronPattern, async () => {
          try {
            await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);
            console.log('Email sent successfully');
          } catch (err) {
            console.log('Error sending email:', err);
          }
        });
      }
      res.status(200).json(bookBorrow);
    } catch (err) {
      console.log('Error:', err);
    }
  }
};

module.exports = scheduleEmail;
