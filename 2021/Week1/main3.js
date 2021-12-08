const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay3.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = getLines(fileContent);

const calculatePowerConsumption = (lines) => {
  let size = lines[0].length;
  let bits = Array(size).fill(0);

  lines.forEach((line) => {
    for (i = 0; i < size; i++) {
      if (line[i] === "0") {
        bits[i] -= 1;
      } else {
        bits[i] += 1;
      }
    }
  });

  let binary = "";
  bits.forEach((bit) => {
    binary += bit < 0 ? "0" : "1";
  });

  let gamma = parseInt(binary, 2);

  var mask = Math.pow(2, size) - 1;

  let epsilon = ~gamma & mask;

  return gamma * epsilon;
};

const calculateRating = (array, position, isOxigen = true) => {
  let subArray = [];
  let popular = 0;
  array.forEach((element) => {
    if (element[position] == "0") {
      popular -= 1;
    } else {
      popular += 1;
    }
  });

  if ((isOxigen && popular < 0) || (!isOxigen && popular >= 0)) {
    array.forEach((element) => {
      if (element[position] == "0") {
        subArray.push(element);
      }
    });
  } else {
    array.forEach((element) => {
      if (element[position] == "1") {
        subArray.push(element);
      }
    });
  }

  return subArray;
};

const calculateLifeSupport = (lines) => {
  let i = 0;
  let oxigen = calculateRating(lines, i);
  while (oxigen.length > 1) {
    i++;
    oxigen = calculateRating(oxigen, i);
  }

  let j = 0;
  let co2 = calculateRating(lines, j, false);
  while (co2.length > 1) {
    j++;
    co2 = calculateRating(co2, j, false);
  }

  return parseInt(oxigen[0], 2) * parseInt(co2[0], 2);
};

console.log("Part 1 answer is: ", calculatePowerConsumption(lines)); // 1307354
console.log("Part 2 answer is: ", calculateLifeSupport(lines)); // 482500

module.exports = {
  calculatePowerConsumption: calculatePowerConsumption,
  calculateLifeSupport: calculateLifeSupport,
};
