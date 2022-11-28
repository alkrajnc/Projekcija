const express = require('express');
const db = require('../services/db');
const router = express.Router();
const files = require('../services/services');
const multer = require('multer');
var fs = require('fs'); 
const folder = './public/videos/';

// * FOR TIMESTAMP IN CONFIG
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


// * FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/videos/')
  },
  filename: function (req, file, cb) { 
    cb(null , file.originalname);   
 }
})

const upload = multer({ storage: storage })



// * GET FILE LIST
router.get('/', async function(req, res, next) {
  try {
    res.json(await files.getList(req.query.page));
  } catch (err) {
    console.error(`Error while getting file list `, err.message);
    next(err);
  }
});

router.get('/logs', async function(req, res, next) {
  try {
    res.json(await files.logs());
  } catch (err) {
    console.error(`Error while fetching logs `, err.message);
    next(err);
  }
});

 
// * DELETE FILE FROM LIST
router.delete('/:file_name', async function(req, res, next) {
  try {
    res.json(await files.remove(req.params.file_name));
  } catch (err) {
    console.error(`Error while deleting file from server`, err.message);
    next(err);
  }
});



// * UPLOAD FILE TO SERVER
router.post('/upload', upload.single('files'), async function(req, res) {
  try {
    files.upload(req.file);
  } catch (error) {
    console.log(error)
  }
  
 
});

// * IZBIRA KATERI FILE SE BO PREDVAJAL
router.post('/media', function(req, res, next) {
  files.playMedia(req.body);
});
// * ODSTRANITEV PROJEKCIJE
router.post('/media/remove', function(req, res, next) {
  files.removeMedia(req.body);
});




module.exports = router;

