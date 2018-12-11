// Return the answer of number1 to the power of number2
// Example: 10, 15 will return 25
function question0(number1, number2) {
    return number1 ** number2
}

// Return number2 divided by number1, rounded down to 2 decimal places
// Example: 3, 37 will return 12.33
function question1(number1, number2) {
    return Math.floor((number2 / number1) * 100) / 100
}

// Return the float point variable number1 as an array of integers, ignoring the period.
// Example: 123.45 will return [1,2,3,4,5]
function question2(number1) {
    temp = number1.toString();
    temp = temp.replace('.', '')
    temp = temp.split("").map(Number);
    return temp
}

// Switch character cases for a string
// Example: "aBcdE" will return "AbCDe"
function question3(inputStr) {
    temp = inputStr.split("");
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == temp[i].toLowerCase()) {
            temp[i] = temp[i].toUpperCase();
        } else {
            temp[i] = temp[i].toLowerCase();
        }
    }
    temp = temp.join("");
    return temp
}

// reverse a string
// Example: "abcde" will return "edcba"
function question4(inputStr) {
    temp = inputStr.split("");
    temp = temp.reverse();
    temp = temp.join("");
    return temp
}


// reverse an array, except for the first and last elements
// Example: [1,2,3,"a","b","c"] will return [1,"b","a",3,2,"c"]
function question5(inputArr) {
    tempFirst = inputArr.shift();
    tempLast = inputArr.pop();
    temp = inputArr.reverse();
    temp.unshift(tempFirst);
    temp.push(tempLast);
    return temp
}

// sort an array of numbers in ascending order. Remove negative numbers and duplicates.
// Example: [25,-100,-1.1,5,23.5,25] will return [5,23.5,25]
function question6(inputArr) {
    temp = inputArr.filter(function(x) { return x >= 0 });
    temp.sort(function(a, b) { return a - b });
    var length = temp.length;
    for (i = 0; i < length - 1; i++) {
        if (temp[i] == temp[i + 1]) {
            temp.splice(i, 1);
            length -= 1;
            i -= 1;
        }
    }
    return temp
}

// convert an array of integers to signed binary, return as array of strings.
// Example: [1,-3,5,-7,9] will return ['1','-11','101','-111','1001']
function question7(inputArr) {
    for (i = 0; i < inputArr.length; i++) {
        inputArr[i] = (inputArr[i]).toString(2);
    }
    return inputArr
}

// given the index position, calculate the value of the fibonacci sequence
// Example: 20 will return 6765
function question8(number1) {
    if (number1 < 2) {
        return number1
    } else {
        return q8(number1 - 1) + q8(number1 - 2)
    }
}

// given a random input, return 1 if its a number, 2 if its a string, 3 otherwise
// Example: 345 will return 1, '345' will return 2, [345] will return 3
function question9(input) {
    if (typeof input == 'number') { return 1 }
    if (typeof input == 'string') { return 2 }
    return 3
}

// Do not modify
module.exports = {
    question0,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9
};