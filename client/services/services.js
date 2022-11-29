const { exec } = require("child_process");
var fs = require('fs');

// * CONFIG TIME STAMP
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

async function startDisplay (req) {
    try {
      if (req.tv_id === 0) {
        fs.appendFile('../log.log', ` ${dateTime} Displaying file on tv0.\n`, function(err) {
          if (err) throw err;
          console.log('Log added');
        });
        exec("pm2 start startdisplayTv0.sh --name display0", (error, stdout, stderr) => {
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

        let message = `Displaying media on tv0`;
        return message;
      } else {
        fs.appendFile('../log.log', ` ${dateTime} Displaying file on tv1.\n`, function(err) {
          if (err) throw err;
          console.log('Log added');
        });
        exec("pm2 start startdisplayTv1.sh --name display1", (error, stdout, stderr) => {
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

        let message = `Displaying media on tv1`;
        return message;
      }
      
  
  } catch (error) {
    fs.appendFile('../log.log', ` ${dateTime} ERROR could not display media(${error}).\n`, function(err) {
        if (err) throw err;
        console.log('Log added');
    });
    return error;
  }
  
}
async function stopDisplay (req) {
  try {
    fs.appendFile('../log.log', ` ${dateTime} Stoped displaying file(${req.filename}).\n`, function(err) {
        if (err) throw err;
        console.log('Log added');
    });
    exec("pm2 stop ../startdisplay.sh --name display", (error, stdout, stderr) => {
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

    let message = `Displaying media(${req.mediaName})`;
    return message;

} catch (error) {
  fs.appendFile('../log.log', ` ${dateTime} ERROR in display media(${error}).\n`, function(err) {
      if (err) throw err;
      console.log('Log added');
  });
  return error;
}

}
module.exports = {
  startDisplay,
  stopDisplay
}