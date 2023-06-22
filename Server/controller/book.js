const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;


const bookCtrl = {
    postBook: async(req,res)=>{
        try{
            const {bookTitle, bookAuthor, image, available} = req.body;
            const newBook = await Book.create({
                bookTitle,
                bookAuthor, 
                image,
                available
            })
        return res.json({msg: "Book posted successfully"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getOneBook : async(req,res)=>{
        try{
            const book = await Book.findOne({
                where: {id: req.params.id}
            });
            if(!book){
                return res.status(400).json({msg: "Book does not exist."});
            }
    
            res.json(book);

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getAllBooks: async(req,res)=>{
        try{
            const books = await Book.findAll();
            return res.status(200).json(books);
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateBook: async(req,res)=>{
        try{
            const patchObject = req.body;
            const {bookTitle, bookAuthor, image, available} = patchObject;
            const updateBook = await Book.update(patchObject,{
                where: {id: req.params.id}
            });

            res.status(200).json("Book Updated successfully");

        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    deleteBook: async (req, res) => {
        try {
          const book = await Book.findByPk(req.params.id);
          if (!book) {
            return res.status(404).json({ msg: "Book not found" });
          }
      
          await book.destroy();
          res.status(200).json("Book deleted successfully");
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      }
}

module.exports = bookCtrl;