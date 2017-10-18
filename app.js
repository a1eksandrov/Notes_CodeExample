//include necessary modules
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const parseUrleconded = bodyParser.urlencoded({extended: false});
//add connection to db url
const db =require('./config/db');

//create server
const app = express();
//assign port
const port = 3000;

//connecting db
mongoClient.connect(db.url, function(err, database) {
	if(err) {
		return console.log(err);
	} else {
		//choose static files folder
		app.use(express.static('public'));
		//use middleware to parse url requests
		app.use(parseUrleconded);
		
		require('./routes/notes')(app, database);
		app.listen(port, () => {
			console.log('Listen on port '+port+'..\n');
		});
	}
});