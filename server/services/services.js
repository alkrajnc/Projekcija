const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { exec } = require("child_process");
var fs = require('fs');
const folder = './public/videos/';
const fetch = require('node-fetch');

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

function playMedia(req) {
	try {
		fs.appendFile('../log.log', ` ${dateTime} Set active media(${req.filename}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
		fs.copyFile(`./public/videos/${req.filename}`, `./public/display/tv${req.tv_id}.mp4`, (err) => {
			if (err) throw err;	
			console.log(`Copied ${req.filename} to tv${req.tv_id}`);
		  });
		// * Shrani prvi frame videa ki se potem uporabi kot thumbnail
		  exec(`ffmpeg -i ./public/display/tv${req.tv_id}.mp4 -vf "select=eq(n\,0)" -vf scale=320:-2 -q:v 3 ./public/thumbnails/tv${req.tv_id}.jpg`, (error, stdout, stderr) => {
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
		  
		fetch('http://194.249.235.20:5000/client/start', {
			method: 'POST',
			body: `{
				"tv_id": ${req.tv_id}
			}`,
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
		db.query(
			`update files set isActiveTv${req.tv_id} = 1 where file_name = "${req.filename}"`
		)
	} catch (error) {
		fs.appendFile('../log.log', ` ${dateTime} ERROR in plating media(${error}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
	}

}

function removeMedia() {
	try {
		db.query(
        `update files set isActiveTv0 = 0;`
      )
      db.query(
        `update files set isActiveTv1 = 0;`
      )

	for (let index = 0; index < 2; index++) {
		fs.unlink(`./public/display/tv${index}.mp4`, function(err) {
		if (err) {
			fs.appendFile('../log.log', ` ${dateTime} ERROR in removing file(${err}).\n`, function(err) {
				if (err) throw err;
				console.log('Log added');
			});
		} 
		console.log(`Active media removed from /display`);
		});
		fetch('http://194.249.235.20:5000/client/stop', {
			method: 'POST',
			body: `{
				"tv_id": "${index}"
			}`,
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
	}
	  fs.appendFile('../log.log', ` ${dateTime} Removed active media.\n`, function(err) {
		if (err) throw err;
		console.log('Log added');
	});
	} catch (error) {
		fs.appendFile('../log.log', ` ${dateTime} ERROR in removing active media(${error}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
	}
}
async function logs() {
	try {
		var data = fs.readFileSync('../log.log').toString().split("\n");
		return { 
			data
		}
	} catch (error) {
		fs.appendFile('../log.log', ` ${dateTime} ERROR in sending log file(${error}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
	}

}


async function getList() {
	try {
		const rows = await db.query(
			`SELECT file_name, file_location, file_type, upload_time, isActiveTv0, isActiveTv1 FROM files`
		);
		return {
			rows
		}
	} catch (error) {
		fs.appendFile('../log.log', ` ${dateTime} ERROR in quyering database(${error}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
	}

}

async function upload (req) {
  	try {
		db.query(
			`INSERT INTO files 
			(file_name, file_location, file_type, upload_time) 
			VALUES 
			("${req.originalname}", "${req.destination}", "${req.mimetype}", CURRENT_TIMESTAMP())`
    	);
		fs.appendFile('../log.log', ` ${dateTime} Uploaded file(${req.originalname}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
		let message = "Uploaded new file.";
		return message;
	
	} catch (error) {
		console.log("Error: " + error)
	}
	
}

async function remove(file_name) {
	try {
		fs.unlink(`./public/videos/${file_name}`, function(err) {
			if (err) {
				fs.appendFile('../log.log', ` ${dateTime} ERROR in removing file(${err}).\n`, function(err) {
					if (err) throw err;
					console.log('Log added');
				});
			} 
			console.log(`File (${file_name}) deleted!`);
		});
		fs.appendFile('../log.log', ` ${dateTime} Removed file from server(${file_name}).\n`, function(err) {
			if (err) throw err;
			console.log('Log added');
		});
		const result = await db.query(
			`DELETE FROM files WHERE file_name="${file_name}"`
		);
		db.query(
			`ALTER TABLE files AUTO_INCREMENT = 1`
		)
	} catch (error) {
		console.log("Error");
	}
}
module.exports = {
	getList,
  	upload,
	remove,
	playMedia,
	removeMedia,
	logs
}