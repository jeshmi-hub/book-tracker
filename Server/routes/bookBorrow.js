const bookReviewCtrl = require('../controller/bookBorrow');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/postBookBorrow',bookReviewCtrl.postBookBorrow);
router.get('/getOneBorrower/:id', bookReviewCtrl.getBorrowBook);
router.get('/getAllBorrower', bookReviewCtrl.getAllBookBorrower);
router.delete('/returnBook/:id', bookReviewCtrl.returnBookBorrowed);


module.exports = router;