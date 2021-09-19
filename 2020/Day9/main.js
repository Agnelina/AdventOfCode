const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay9.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

let numbers = [];

lines.forEach((line) => {
    console.log(line);
    numbers.push(parseInt(line));
});

const findFirstWeak = ({numbers, preamble}) => {
    let currentIndex = preamble;
    while(true){
        let currentNumber = numbers[currentIndex];
        let currentNumbers = [...numbers].splice(currentIndex-25,25);
        let isValid = false;
        for (let i = 0 ; i < currentNumbers.length ; i ++){
            if (currentNumbers.includes(currentNumber-currentNumbers[i])
                && currentNumber-currentNumbers[i] != currentNumbers[i]){
                    isValid = true;
            }
        }
        if (isValid){
            currentIndex += 1;
        } else {
            console.log("ANSWER: ", currentNumber);
            return currentNumber;
        }
    }
};

const findSum = ({numbers, sum}) => {
    let startIndex = 0;
    while(startIndex < numbers.length){
        console.log(startIndex);
        let currentIndex = startIndex;
        let currentSum = 0;
        while (currentSum < sum){
            currentSum += numbers[currentIndex];
            currentIndex += 1;
            // console.log("SUM", currentSum);
        }
        if (currentSum == sum){
            console.log("ANSWER");
            console.log(startIndex, currentIndex);
            return {startIndex, currentIndex}
        } else {
            startIndex += 1;
        }
    }
}


sumToFind = findFirstWeak({numbers, preamble: 25}); // part 1 answer
console.log(sumToFind); // 105950735 // 564 indexe
const {startIndex, currentIndex: endIndex} = findSum({numbers, sum: sumToFind}); // 448, 465
const sumArray = numbers.slice(startIndex, endIndex);
const minV = Math.min(...sumArray);
const maxV = Math.max(...sumArray);
console.log(sumArray);
console.log(minV + maxV);

