const { exec } = require("child_process");


async function upload (req) {
    try {
      fs.appendFile('../log.log', ` ${dateTime} Uploaded file(${req.originalname}).\n`, function(err) {
          if (err) throw err;
          console.log('Log added');
      });
      

      let message = `Displaying media(${req.mediaName})`;
      return message;
  
  } catch (error) {
    fs.appendFile('../log.log', ` ${dateTime} ERROR could not display media(${error}).\n`, function(err) {
        if (err) throw err;
        console.log('Log added');
    });
    return error;
  }
  
}