const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { exec } = require("child_process");
var fs = require('fs'); 
const folder = './public/videos/';


function playMedia (req){
  db.query(
    `update files set isActiveTv${req.tv_id} = 1 where file_name = "${req.filename}"`
  )
}
function removeMedia(req){
  if (req.filename !== undefined) {
    db.query(
    `update files set isActiveTv${req.tv_id} = 0 where file_name = "${req.filename}"`
  )
  } else {
    for (let index = 0; index < 2; index++) {
      db.query(
      `update files set isActiveTv${index} = 0`
      )
    }
    
  }
  
}



async function getList(){
    const rows = await db.query(
    `SELECT file_name, file_location, file_type, upload_time, isActiveTv0, isActiveTv1 FROM files`
  );

  return {
    rows

  }
}



async function remove(file_name){
  try {
      fs.unlink(`./public/videos/${file_name}`, function (err) {
      if (err) throw err;
      console.log(`File (${file_name}) deleted!`);
    }); 
    const result = await db.query(
      `DELETE FROM files WHERE file_name="${file_name}"`
    );
    db.query(
      `ALTER TABLE files AUTO_INCREMENT = 1
      `
    )
  } catch (error) {
    console.log("Error");
  }
}
module.exports = {
  getList,
  remove,
  playMedia,
  removeMedia
}
