const bookReviewCtrl = require('../controller/bookBorrow');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/postBookBorrow',bookReviewCtrl.postBookBorrow);
router.get('/getOneBorrower/:id', bookReviewCtrl.getBorrowBook);
router.get('/getAllBorrower', bookReviewCtrl.getAllBookBorrower);

router.patch('/addBook/:id',bookReviewCtrl.addBook);
router.patch('/deleteBook/:id', bookReviewCtrl.deleteBook);
module.exports = router;