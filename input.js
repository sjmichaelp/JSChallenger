

// Reverse an array, except for the first and last elements
// Example: [1,2,3,"a","b","c"] will return [1,"b","a",3,2,"c"]
function question0(inputArr) {
	tempFirst = inputArr.shift();
    tempLast = inputArr.pop();
    temp = inputArr.reverse();
    temp.unshift(tempFirst);
    temp.push(tempLast);
    return temp
}



// Convert an array of integers to signed binary, return as array of strings.
// Example: [1,-3,5,-7,9] will return ['1','-11','101','-111','1001']
function question1(inputArr) {
    for (i = 0; i < inputArr.length; i++) {
        inputArr[i] = (inputArr[i]).toString(2);
    }
    return inputArr
}



// Return number2 divided by number1, rounded down to 2 decimal places
// Example: 3, 37 will return 12.33
function question2(number1, number2) {
    return Math.floor((number2 / number1) * 100) / 100	
}



// Return the answer of number1 to the power of number2
// Example: 10, 15 will return 25
function question3(number1, number2) {

}




// Sort an array of numbers in ascending order. Remove negative numbers and duplicates.
// Example: [25,-100,-1.1,5,23.5,25] will return [5,23.5,25]
function question4(inputArr) {

}

