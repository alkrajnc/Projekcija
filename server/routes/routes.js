const express = require('express');
const db = require('../services/db');
const router = express.Router();
const files = require('../services/services');
const multer = require('multer');
var fs = require('fs'); 
const folder = './public/videos/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/videos')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
});
const uploadFile = multer({storage:storage})

router.get('/', async function(req, res, next) {
  try {
    console.log("Querying file list");
    res.json(await files.getList(req.query.page));
  } catch (err) {
    console.error(`Error while getting file list `, err.message);
    next(err);
  }
});

router.delete('/:file_name', async function(req, res, next) {
  try {
    res.json(await files.remove(req.params.file_name));
  } catch (err) {
    console.error(`Error while deleting file from server`, err.message);
    next(err);
  }
});





/* POST files */
router.post('/upload', uploadFile.single('test'), function(req, file) {
  console.log(req.file, req.body);
  queryFileList();
  upload(req);
});

/* POST files */
router.post('/media', function(req, file) {
  console.log(req.body)
  
});



function queryFileList () {
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
}

async function upload (service) {
  console.log("Uploading file");
  const result = await db.query(
      `INSERT INTO files 
      (file_name, file_location, file_type, upload_time) 
      VALUES 
      ("${service.file.filename}", "${service.file.destination}", "${service.file.mimetype}", CURRENT_TIMESTAMP())`
    );
}

module.exports = router;

