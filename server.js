const express = require('express');
const hbs = require('hbs');
const fs = require("fs");
const bodyParser = require('body-parser');
const main = require('./main.js');
const fileUpload = require('express-fileupload');
const login = require('./login.js');

const port = process.env.PORT || 8080;

var app = express();
var url ='';

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (request, response) => {
    response.render('index.hbs')
});

app.post('/loginsuccess', (request, response) => {
	var user = {
		username: request.body.username,
		password: request.body.password
	};
	// User login 
	login.login(user, (errorMessage, results) => {
		// Return no user or wrong password
		if (errorMessage) {
			console.log(errorMessage);
				response.render('index.hbs', {
					status: errorMessage
				});
		} else {
			if (!results) {
				return response.status(404).send();
			} else {
				// Login successfully and create key
				console.log("login successful");
				response.render('loginsuccess.hbs');

				currentKey = main.generateKey(user.user, user.password);
			}
		}

		// Download the challenge
		app.get('/download', function(req, res){
			// Challenge is created using key
			if (fs.existsSync(__dirname + '/' + currentKey +'.js')) {
				console.log('file exists');
			} else {
				console.log('creating file');
				main.newQuestions(currentKey);
			}
  			var file = __dirname + '/'+ currentKey +'.js';
  			res.download(file); // Set disposition and send it.
  			console.log('download successful');
		});

		// Upload your challenge
		app.post('/upload', function(req, res) {
			if (Object.keys(req.files).length == 0) {
		    	return res.status(400).send('No files were uploaded.');
			}
			// Load questions by key when you upload
		  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
		  // Use the mv() method to place the file somewhere on your server
			let sampleFile = req.files.sampleFile;

			sampleFile.mv(__dirname + '/input.js', function(err) {
		    	if (err) {
		    		return res.status(500).send(err);
		    	}
		    	// Mark the script
		  		answers = main.checkAnswers(currentKey);
				res.render('upload.hbs', {
					answers: answers
				});
				console.log('upload successful');

		  	});
		});
	});

	// logout
	app.get('/logout', (request, response) => {
		//fs.unlink(__dirname + '/'+currentKey+'.js', function (err) {
		//	if (err) throw err;
			// if no error, file has been deleted successfully
		//		console.log('File deleted!');
		//	});
		response.render('index.hbs', {});
	});
});

// Redirect to user signup page
app.get('/signup', (request, response) => {
    response.render('signup.hbs', {});
});

// Append json user data into logins.json
app.post('/signupsuccess', (request, response) => {
	var user = {
		username: request.body.username,
		password: request.body.password
	}
	login.register(user);
		response.render('index.hbs', {
			status: "signup success"
	});
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});