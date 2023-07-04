const jwt = require('jsonwebtoken');
const db = require("../models");
const BookBorrow = db.bookBorrow;
const User = db.users;
const Book = db.book;
const Op = db.Sequelize.Op;
const emailScheduler = require('./emailscheduler')
const axios = require('axios')

const borrowBookCtrl = {
  postBookBorrow: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const bookTitle = req.body.bookTitle;

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.id;

      const user = await User.findByPk(userId, {
        attributes: ['id', 'email'],
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const book =await Book.findOne({
      where: {
        bookTitle: bookTitle,
      },
    })
    console.log("book info",book.id)

      const email = user.email;
      const newBookBorrow = await BookBorrow.create({
        userId: user.id,
        bookId:book.id,
        email: email,
        bookTitle: bookTitle,
      });

      const emailResponse = await axios.get(`http://localhost:8000/schedule-email/${book.id}`);
      // console.log("email response",await emailResponse.json())
      return res.status(200).json({ success: true, bookBorrow: newBookBorrow, msg: `${bookTitle} borrowed` });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Invalid token' });
    }


  },
  getBorrowBook: async(req,res)=>{
    try{
        const borrowed = await BookBorrow.findOne({
            where: {id: req.params.id},
        });

        if(!borrowed){
            return res.status(400).json({msg: 'The borrowed book does not exist'})
        }

        res.json(borrowed);

    }catch(err){
        return res.status(500).json({msg: err.message});

    }

  },
  getAllBookBorrower: async(req,res)=>{
    try{
        const borrower = await BookBorrow.findAll();
        return res.status(200).json(borrower);
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
  },
  
  returnBookBorrowed : async(req,res)=>{
    const {id} = req.params;
    const token = req.headers.authorization.split(' ')[1];
    try{
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.id;
      const book = await BookBorrow.findOne({
        where: {bookId: id,
        userId:  userId},
      })
      
      if(!book){
        return res.status(404).json({msg: "Book not found"});
      }

      await book.destroy();
      res.status(200).json("Book returned successfully");

    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }
};

module.exports = borrowBookCtrl;
