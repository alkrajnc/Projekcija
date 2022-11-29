const express = require('express');
const router = express.Router();
const service = require('../services/services');
const { exec } = require("child_process");

// * FOR TIMESTAMP IN CONFIG
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;




// * IZBIRA KATERI FILE SE BO PREDVAJAL
router.post('/start', function(req, res, next) {
  try {
    console.log('start display');
    console.log(req.body.tv_id);
    //res.json(service.startDisplay(req.body))
    
  } catch (error) {
    console.error('Error(service.startDisplay): ' + error)
  }
  
});
router.post('/stop', function(req, res, next) {
  try {
    service.stopDisplay(req.body);
  } catch (error) {
    console.error('Error(service.stopDisplay): ' + error)
  }
  
});


module.exports = router;

