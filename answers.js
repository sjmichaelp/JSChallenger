const requireUncached = require('require-uncached');

// generate random values for testing
randomInt1 = Math.floor(Math.random() * 100);
randomInt2 = Math.floor(Math.random() * 100);
randomInt3 = Math.floor(Math.random() * 20);
randomInt4 = Math.floor(Math.random() * 3) + 1;
randomFloat = Math.random() * 100;

var stringSize = Math.floor(Math.random() * 10) + 10;
var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
inputStr = "";
for (var i = 0; i < stringSize; i++) {
    inputStr += charset[Math.floor(Math.random() * charset.length)];
}

var randomArr = [];
var randomNumberArr = [];
var randomIntArr = [];
for (var i = 0; i < stringSize; i++) {
    randomArr.push(charset[Math.floor(Math.random() * charset.length)]);
    randomNumberArr.push((Math.random() - 0.5) * 100);
    randomIntArr.push(Math.floor(Math.random() * 100) - 50);
}

// a few duplicate integers added for randomNumberArr
randomNumberArr.push(randomInt1);
randomNumberArr.push(randomInt1);
randomNumberArr.unshift(randomInt1);

// -------------------------------------------------------- 
// testing student functions

// checker function for array comparison
function arrNotEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) { return true; }
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) { return true; }
    }
    return false;
}

// Question 0: add two numbers
// Example: 10, 15 will return 25
var function0 = () => {
    if (requireUncached('./questions.js').q0(randomInt1, randomInt2) !== randomInt1 ** randomInt2) { throw (err) }
}


// Question 1: divide number 2 by number 1, rounded down with 2 decimal places
// Example 3, 37 will return 12.33
var function1 = () => {
    if (requireUncached('./questions.js').q1(randomInt1, randomInt2) !== Math.floor((randomInt2 / randomInt1) * 100) / 100) { throw (err) }
}


// Question 2: convert a float number to an array of digits, ignoring the period.
// Example: 123.45 will return [1,2,3,4,5]
var function2 = () => {
    if (arrNotEqual(randomFloat.toString().replace('.', '').split("").map(Number), requireUncached('./questions.js').q2(randomFloat))) { throw (err) }
}

// Question 3: flip character cases of a string
// Example: "aBcdE" will return "AbCDe"
var function3 = () => {
    temp = inputStr.split("");
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == temp[i].toLowerCase()) {
            temp[i] = temp[i].toUpperCase();
        } else {
            temp[i] = temp[i].toLowerCase();
        }
    }
    temp = temp.join("");
    if (temp != requireUncached('./questions.js').q3(inputStr)) { throw (err) }
}

// Question 4: reverse a string
// Example: "abcde" will return "edcba"
var function4 = () => {
    if (requireUncached('./questions.js').q4(inputStr) !== inputStr.split("").reverse().join("")) { throw (err) }
}

// Question 5: reverse an array, except for the first and last elements
// Example: [1,2,3,"a","b","c"] will return [1,"b","a",3,2,"c"]
var function5 = () => {
    inputArr = randomArr.slice();
    temp = inputArr.splice(1, inputArr.length - 2).reverse();
    temp.push(inputArr.slice(-1)[0]);
    temp.unshift(inputArr[0]);
    if (arrNotEqual(temp, requireUncached('./questions.js').q5(randomArr))) { throw (err) }
}

// Question 6: sort an array of numbers in ascending order. Remove negative numbers and duplicates.
// Example: [25,-100,-1.1,5,23.5,25] will return [5,23.5,25]
var function6 = () => {
    temp = randomNumberArr.filter(x => { return x >= 0 });
    temp = [...new Set(temp)];
    temp.sort((a, b) => { return a - b });
    if (arrNotEqual(temp, requireUncached('./questions.js').q6(randomNumberArr))) { throw (err) }
}

// Question7: convert an array of integers to signed binary, return as array of strings.
// Example: [1,-3,5,-7,9] will return ['1','-11','101','-111','1001']
var function7 = () => {
    temp = randomIntArr.slice();
    for (i = 0; i < temp.length; i++) {
        temp[i] = (temp[i]).toString(2);
    }
    if (arrNotEqual(temp, requireUncached('./questions.js').q7(randomIntArr))) { throw (err) }
}

// Question 8: given the index position, calculate the value of the fibonacci sequence
// Example: 20 will return 6765
var function8 = () => {
    temp = [0, 1];
    for (i = 2; i < randomInt3 + 1; i++) {
        temp.push(temp[i - 2] + temp[i - 1])
    }
    if (temp[randomInt3] !== requireUncached('./questions.js').q8(randomInt3)) { throw (err) }
}

// Question 9: given a random input, return 1 if its a number, 2 if its a string, 3 otherwise
// Example: 345 will return 1, '345' will return 2, [345] will return 3
var function9 = () => {
    switch (randomInt4) {
        case 1:
            temp = 1;
            break;
        case 2:
            temp = '1';
            break;
        case 3:
            temp = [2];
    }
    if (randomInt4 != requireUncached('./questions.js').q9(temp)) { throw (err) }
}

module.exports = {
    function0,
    function1,
    function2,
    function3,
    function4,
    function5,
    function6,
    function7,
    function8,
    function9
};