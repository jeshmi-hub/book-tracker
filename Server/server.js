const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const multer = require("multer");
const cron = require('node-cron');
const sendEmail = require("./utils/sendEmail");
const db = require("./models");
const BookBorrow = db.bookBorrow;
const axios = require("axios")

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.get('/', (req,res)=>{
  res.render('index.ejs')
})

app.post('/form-submit', (req,res)=>{
  axios.post('https://hooks.slack.com/services/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', 
  {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Name: *${req.body.name}*\n \n Email: *${req.body.email}*`
        }
      }
    ]
  
  }).then(() => {
    res.send('Form submitted')
  }).catch(() => {
    res.send('Form submission Failed')
  })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../client/public/images')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    },
});

const upload = multer({storage})

app.post('/upload', upload.single('file'), function(req,res){
    const file = req.file;
    res.status(200).json(file.filename)
});

const scheduleEmail = async (req, res) => {
    try {
      const { email } = req.query;
      const { id } = req.params; 
      const bookBorrow = await BookBorrow.findByPk(id); 
  
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
  };
  
  
  
const userRoute = require('./routes/user');
app.use('/', userRoute)
const bookRoute = require('./routes/book');
app.use('/', bookRoute)
const reviewRoute = require('./routes/review');
app.use('/', reviewRoute)
const bookBorrowRoute = require("./routes/bookBorrow");
app.use('/', bookBorrowRoute);
app.get('/schedule-email/:id', scheduleEmail);
const port = process.env.PORT || 8000



app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})
