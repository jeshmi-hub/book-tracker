const scheduleController = require('../controller/emailscheduler');
const express = require("express");
const router = express.Router();


router.get("/schedule-email/:id", scheduleController.scheduler)

module.exports= router;