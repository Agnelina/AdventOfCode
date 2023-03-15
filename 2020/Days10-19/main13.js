const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay13.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

const arrivalTime = parseInt(lines[0]);
const buslines = lines[1].split(",");
const timeIndexes = [];
for (let i = 0; i < buslines.length; i++) {
  if (buslines[i] != "x") {
    timeIndexes.push(i);
  }
}
// console.log(timeIndexes);
const busses = lines[1].replace(/x,/g, "").split(",").map(Number);

// console.log(arrivalTime);

// console.log(busses);

let time = arrivalTime;

while (true) {
  let found = false;
  busses.forEach((bus) => {
    if (time % parseInt(bus) == 0) {
      console.log("First part answer: ", (time - arrivalTime) * bus); // 2947
      found = true;
    }
  });
  if (found) break;
  time += 1;
}

const getInversed = (M, bus) => {
  let i = 1;
  while ((M * i) % bus !== 1) {
    i++;
  }
  return i;
};

const ChineseRemainder = (numbers, remainders) => {
  // Chinese Remainder Theorem

  const multiplied = numbers.reduce((prev, curr) => prev * curr);
  //   console.log("m:", multiplied);
  const M = numbers.map((bus) => multiplied / bus);
  //   console.log("M", M);
  const inversedM = M.map((Mi, index) => getInversed(Mi, numbers[index]));
  //   console.log("M'", inversedM);
  let result = 0;
  for (i = 0; i < numbers.length; i++) {
    result += remainders[i] * M[i] * inversedM[i];
  }
  return result % multiplied;
};

const findSubsequentBusDeparture = (busses, timeIndexes) => {
  const remainders = timeIndexes.map(
    (timeIndex, index) => busses[index] - (timeIndex % busses[index])
  );

  return ChineseRemainder(busses, remainders);
};

console.log(
  "Part 2 answer is: ",
  findSubsequentBusDeparture(busses, timeIndexes)
);
// 526090562196176 is too high
// 526090562196172 is too low
// 526090562196173 correct answer
// why I am off by 1? Does the number reaches a limit at some point?

module.exports = {
  findSubsequentBusDeparture: findSubsequentBusDeparture,
  ChineseRemainder: ChineseRemainder,
};
