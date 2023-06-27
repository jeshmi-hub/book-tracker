const bookCtrl = require('../controller/book');
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


router.post("/postBook",auth, authAdmin, bookCtrl.postBook);
router.get("/getOneBook/:id",auth, authAdmin, bookCtrl.getOneBook);
router.get("/getAllBooks", bookCtrl.getAllBooks);
router.put("/updateBook/:id", auth, authAdmin, bookCtrl.updateBook);
router.delete("/deleteBook/:id",auth,authAdmin, bookCtrl.deleteBook);

module.exports = router;