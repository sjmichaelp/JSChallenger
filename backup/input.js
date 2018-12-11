

// Convert an array of integers to signed binary, return as array of strings.
// Example: [1,-3,5,-7,9] will return ['1','-11','101','-111','1001']
function question0(inputArr) {
    for (i = 0; i < inputArr.length; i++) {
        inputArr[i] = (inputArr[i]).toString(2);
    }
    return inputArr
}



// Sort an array of numbers in ascending order. Remove negative numbers and duplicates.
// Example: [25,-100,-1.1,5,23.5,25] will return [5,23.5,25]
function question1(inputArr) {
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



// Switch character cases for a string
// Example: "aBcdE" will return "AbCDe"
function question2(inputStr) {
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



// Given the index position, calculate the value of the fibonacci sequence
// Example: 20 will return 6765
function question3(number1) {
    if (number1 < 2) {
        return number1
    } else {
        return question3(number1 - 1) + question3(number1 - 2)
    }
}



// Return number2 divided by number1, rounded down to 2 decimal places
// Example: 3, 37 will return 12.33
function question4(number1, number2) {
    return Math.floor((number2 / number1) * 100) / 100
}