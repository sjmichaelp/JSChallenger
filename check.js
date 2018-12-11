const ans = require('./answers.js');

// run the student functions
var runFunc = (numb) => {
	switch(numb) {
		case 0:
			ans.function0();
			break;
		case 1:
			ans.function1();
			break;
		case 2:
			ans.function2();
			break;
		case 3:
			ans.function3();
			break;
		case 4:
			ans.function4();
			break;
		case 5:
			ans.function5();
			break;
		case 6:
			ans.function6();
			break;
		case 7:
			ans.function7();
			break;
		case 8:
			ans.function8();
			break;
		case 9:
			ans.function9();
			break;			
	}
}

// iterate through each question given
var check = (questions) => {
	correct = []
	for (var i = 0; i < questions.length; i++) {
		working = true
		try {
			runFunc(questions[i]);
		} catch(err) {
			working = false
		}
		correct.push(working);
	}
	return correct;
}

// get the result
// storage is a string containing the orders of questions given
var getResult = (storage) => {
	qList = storage.split("").map(Number);
	return check(qList)
}

module.exports = {
	getResult
};

