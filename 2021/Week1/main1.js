const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay1.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = getLines(fileContent);

let measures = [];

lines.forEach((line) => {
  // console.log(line);
  measures.push(parseInt(line));
});

console.log(measures);

const calculateIncreases = (measures) => {
  let previous = measures[0];
  let numberOfIncreases = 0;
  for (i = 1; i < measures.length; i++) {
    if (measures[i] > previous) {
      numberOfIncreases++;
    }
    previous = measures[i];
  }

  return numberOfIncreases;
};

const calculateGroupIncreases = (measures) => {
  let previousSum = measures[0] + measures[1] + measures[2];
  let numberOfIncreases = 0;
  for (i = 3; i < measures.length; i++) {
    let currentSum = measures[i] + measures[i - 1] + measures[i - 2];
    if (currentSum > previousSum) {
      numberOfIncreases++;
    }
    previousSum = currentSum;
  }

  return numberOfIncreases;
};

console.log("Part 1 answer is: ", calculateIncreases(measures)); // 1581
console.log("Part 2 answer is: ", calculateGroupIncreases(measures)); // 1618

module.exports = {
  calculateIncreases: calculateIncreases,
  calculateGroupIncreases: calculateGroupIncreases,
};
