const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay2.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = getLines(fileContent);

const calculatePosition = (lines) => {
  let horizontal = 0;
  let depth = 0;
  lines.forEach((line) => {
    let command = line.split(" ");
    if (command[0] === "forward") {
      horizontal += parseInt(command[1]);
    } else if (command[0] === "down") {
      depth += parseInt(command[1]);
    } else {
      depth -= parseInt(command[1]);
    }
  });
  return depth * horizontal;
};

const calculatePosition2 = (lines) => {
  let aim = 0;
  let horizontal = 0;
  let depth = 0;
  lines.forEach((line) => {
    let command = line.split(" ");
    if (command[0] === "forward") {
      horizontal += parseInt(command[1]);
      depth += aim * parseInt(command[1]);
    } else if (command[0] === "down") {
      aim += parseInt(command[1]);
    } else {
      aim -= parseInt(command[1]);
    }
    console.log(aim, horizontal, depth);
  });
  return depth * horizontal;
};

console.log("Part 1 answer is: ", calculatePosition(lines)); // 1250395
console.log("Part 2 answer is: ", calculatePosition2(lines)); // 1451210346

module.exports = {
  calculatePosition: calculatePosition,
  calculatePosition2: calculatePosition2,
};
