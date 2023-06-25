const scheduler =  require('../controller/emailscheduler');
const express = require("express");
const router = express.Router();

router.get("/schedule", scheduler.scheduler);

module.exports = router;