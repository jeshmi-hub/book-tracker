const jwt = require('jsonwebtoken');
const db = require("../models");
const BookBorrow = db.bookBorrow;
const User = db.users;
const Op = db.Sequelize.Op;

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

      const email = user.email;
      const newBookBorrow = await BookBorrow.create({
        userId: user.id,
        email: email,
        bookTitle: bookTitle,
      });

      return res.status(200).json({ success: true, bookBorrow: newBookBorrow });
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

  addBook:async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.id;
  
      const user = await User.findByPk(userId);
  
      await BookBorrow.update(
        {
          cart: req.body.cart
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
  
      return res.json({ msg: "Added to Cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBook:async(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.id;
  
      const user = await User.findByPk(userId);
  
      await BookBorrow.update(
        {
          cart: req.body.cart
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
  
      return res.json({ msg: "Removed from cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  }
};

module.exports = borrowBookCtrl;
