const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { exec } = require("child_process");
var fs = require('fs'); 
const folder = './public/videos/';


function playMedia (){
  exec("ls", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
}



async function getList(){
    const rows = await db.query(
    `SELECT file_name, file_location, file_type, upload_time, isActive FROM files`
  );

  return {
    rows

  }
}



async function remove(file_name){
  
  fs.unlink(`./public/videos/${file_name}`, function (err) {
    if (err) throw err;
    console.log(`File (${file_name}) deleted!`);
  }); 
  const result = await db.query(
    `DELETE FROM files WHERE file_name="${file_name}"`
  );

  let message = 'Error in deleting programming language';

  if (result.ok) {
    message = 'Success';
  }

  

  return {message};
}
module.exports = {
  getList,
  remove,
  playMedia
}
