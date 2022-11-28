const express = require('express');
const db = require('../services/db');
const router = express.Router();
const service = require('../services/services');
const { exec } = require("child_process");

// * FOR TIMESTAMP IN CONFIG
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;




// * IZBIRA KATERI FILE SE BO PREDVAJAL
router.post('/', function(req, res, next) {
  service.startDisplay(req.body);
});


module.exports = router;

