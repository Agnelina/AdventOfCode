const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay14.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

const calculateMaskedValue = (mask, value) => {
  let binaryAnswer = "";
  let binaryValue = parseInt(value).toString(2);
  for (var i = mask.length - 1; i >= 0; i--) {
    if (mask[i] === "X") {
      const lastChar = binaryValue ? binaryValue.slice(-1) : "0";
      binaryAnswer = lastChar + binaryAnswer;
    } else {
      binaryAnswer = mask[i] + binaryAnswer;
    }
    binaryValue = binaryValue?.slice(0, -1);
  }
  const decimalAnswer = parseInt(binaryAnswer, 2);
  return decimalAnswer;
};

const calculateDictionarySum = (dict) => {
  let sum = 0;
  for (const [key, value] of Object.entries(dict)) {
    sum += value;
  }
  return sum;
};

const createDictionary = (lines) => {
  var dict = {};
  let mask = "";

  lines.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.substring(7, line.length);
    } else {
      const id = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
      const value = line.split("= ")[1];
      dict[id] = calculateMaskedValue(mask, value);
    }
  });
  return dict;
};

console.log(
  "Part 1 answer is: ",
  calculateDictionarySum(createDictionary(lines))
);
// 6944882941264 - answer is too low
// 7773955420732 - answer is too low
// 14954914379452 - correct answer

module.exports = {
  calculateMaskedValue: calculateMaskedValue,
  calculateDictionarySum: calculateDictionarySum,
  createDictionary: createDictionary,
};
