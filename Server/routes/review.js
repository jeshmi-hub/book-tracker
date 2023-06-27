const reviewCtrl = require('../controller/review');
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/postReview', reviewCtrl.postReview);
router.get('/getOneReview/:id',auth, reviewCtrl.getReview);
router.get('/getAllReviews',  reviewCtrl.getAllReview);
router.put('/updateReview/:id',auth, reviewCtrl.updateReview);

module.exports = router;