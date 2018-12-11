const fs = require('fs');
const check = require('./check.js');
const seedrandom = require('seedrandom');

// define how many questions you want to assign
maxQuestion = 5;

// to be replaced with actual login info

// create a key for the question list based on ID and PW
var keys = (k1, k2) => {
	// rng with specific seeding
	var rng = seedrandom(k1 + k2);

	// array with each number in the seeded rng as a single element
	var key = rng().toString().split('');

	// discard the first digit (always 0) and decimal point
	key.shift();
	key.shift();

	// remove duplicate numbers in the array
	key = key.filter((char, i, self) => {return self.indexOf(char) == i;});

	// returns the seeded rng as a string
	return key.join('')
}

// generate the hashed key
var generateKey = (ID, PW) => {
	currentkey = keys(ID, PW);

	// make sure each question is in the list when the hash doesn't contain all numbers
	if (currentkey.length < 10) {
		currentkey += '0123456789'
		currentkey = currentkey.split('');
		currentkey = currentkey.filter((char, i, self) => {return self.indexOf(char) == i;});
		currentkey = currentkey.join('');
	}
	console.log(currentkey);
	return currentkey;
}


// generate new list of questions for student to download
var newQuestions = (currentkey) => {
	templist = fs.readFileSync('blankquestion.js', 'utf8').split('-----');
	tempoutput = Array(10).fill("");

	// delete old temp file on server
	try {
		fs.unlinkSync('output.js');
	}
	catch (err) {
		console.log('No obsolete file found');
	}


	modify = currentkey.split("");
	for (i = 0; i < currentkey.length; i++) {
		templist[i] = templist[i].replace(`question${i}`,`question${modify[i]}`);
		tempoutput[parseInt(modify[i])] = templist[i];
	}

	for (i = 0; i < maxQuestion; i++) {
	    fs.appendFileSync(currentkey+'.js', tempoutput[i]);
	}

	// ------------------ offer the student this file (trial.js) to download ------------------
}



// physically write the module.exports
var decrypt = (temp) => {
	fs.appendFileSync('questions.js', temp.join(""));
}


// map hash to module.exports to the student file for evualation
var tail = (currentkey) => {
	fs.copyFileSync('input.js', 'questions.js');
	template = fs.readFileSync('tail.js', 'utf8').split('-----');

	temp = [template[0]];

	for (i = 0; i < maxQuestion; i++) {
		temp.push(template[1]);
		temp.push(currentkey.indexOf(i));
		temp.push(template[2]);
		temp.push(i);
		temp.push(template[3]);
	}

	temp.push(template[4]);
	fs.appendFileSync('questions.js', temp.join(""));
} 

// tally correct answers.
var tally = (inputList) => {
	temp = 0
	for (i = 0; i < inputList.length; i++) {
		if (inputList[i]) {temp += 1;}
	}
	return temp;
}

var checkAnswers = (currentkey) => {
	tail(currentkey);
	qList = "0123456789".split("");
	for (i = 0; i < currentkey.length; i++) {
		qList[i] = currentkey.indexOf(i);
	}
	qList = qList.join("");

	result = check.getResult(qList.slice(0,maxQuestion));
	// print this message on the web page instead of console log
	return `${tally(result)}/${result.length}`;		
}

// run this when the student click button to get questions on web page
//newQuestions(generateKey(ID, PW))

// run this to get the result when a student submit a file
// this console.log is for debugging purposes

module.exports = {	
	keys: keys,
	generateKey: generateKey,
	newQuestions: newQuestions,
	decrypt: decrypt,
	tail: tail,
	tally: tally,
	checkAnswers: checkAnswers	
}
