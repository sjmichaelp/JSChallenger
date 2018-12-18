const fs = require('fs');



/**
* This function add an user to json file database
* Require Data: user
* @param {object} user - Requires username, password 
*/
var register = (user, callback) => {
   var logins = fs.readFileSync('logins.json', 'utf8');
   var loginsObject = JSON.parse(logins);

   	function getExistingUsername(name) {
		return loginsObject.filter(
			function(loginsObject) {
				return loginsObject.username == name;
			});
	}

	var userdata = getExistingUsername(user.username);
	if (user.username && user.password) {
		if (userdata.length > 0) {
			callback("username already exists", {});
		} else {
			loginsObject.push(user);
			var resultString = JSON.stringify(loginsObject);
			fs.writeFileSync('logins.json', resultString);
			callback(undefined, {
				status: "signup success"
			})
		}
	} else {
		callback("invalid username or password", {});
	}
};

/**
* This function checks if user is in the mysql database
* Require Data: user
* @param {object} user - Requires email, password 
* @param {function} callback - Returns an object
*/

var login = (user, callback) => {

	var logins = fs.readFileSync('logins.json', 'utf8');
	var loginsObject = JSON.parse(logins);

	function getPasswordByUsername(name) {
		return loginsObject.filter(
			function(loginsObject) {
				return loginsObject.username == name;
			});
	}

	var userdata = getPasswordByUsername(user.username);

	if (userdata.length > 0) {
		if (userdata[0].password == user.password) {
			callback(undefined, {
				user: user.password
			});
		} else {
			callback("password does not match", {});
		}
	} else {
		callback("user does not exist", {});
	}
};

module.exports = {
	register: register,
	login: login
}