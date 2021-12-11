const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay4.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = getLines(fileContent);

const findWinningNumber = (currentCard, gameNumbers) => {
  let bestIndex = Number.MAX_VALUE;

  // check rows
  currentCard.forEach((line) => {
    let index = 0;
    line.forEach((value) => {
      let current = gameNumbers.findIndex((i) => i == value);
      if (current > index) {
        index = current;
      }
    });
    if (index < bestIndex) {
      bestIndex = index;
    }
  });

  // check columns
  for (column = 0; column < 5; column++) {
    let index = 0;
    for (row = 0; row < 5; row++) {
      let current = gameNumbers.findIndex((i) => i == currentCard[row][column]);
      if (current > index) {
        index = current;
      }
    }
    if (index < bestIndex) {
      bestIndex = index;
    }
  }

  return bestIndex;
};

const sumOfUnmarkedNumbers = (winningCard, gameNumbers, winningNumberIndex) => {
  let subset = [...gameNumbers].splice(0, winningNumberIndex + 1);
  let sum = 0;

  winningCard.forEach((line) => {
    line.forEach((value) => {
      if (subset.findIndex((i) => i == value) === -1) {
        sum += parseInt(value);
      }
    });
  });

  return sum;
};

const bingo = (lines, winning = true) => {
  let gameNumbers = lines[0].split(",");
  let winningNumberIndex = winning ? Number.MAX_VALUE : 0;
  let winningCard = [];
  let currentCard = [];

  for (i = 2; i < lines.length; i++) {
    if (lines[i] != "") {
      currentCard.push(lines[i].trim().replaceAll("  ", " ").split(" "));
    } else {
      let currentIndex = findWinningNumber(currentCard, gameNumbers);
      if (winning && currentIndex < winningNumberIndex) {
        winningNumberIndex = currentIndex;
        winningCard = currentCard;
      }
      if (!winning && currentIndex > winningNumberIndex) {
        winningNumberIndex = currentIndex;
        winningCard = currentCard;
      }
      currentCard = [];
    }
  }

  let sum = sumOfUnmarkedNumbers(winningCard, gameNumbers, winningNumberIndex);

  return sum * gameNumbers[winningNumberIndex];
};

const noBingo = (lines) => {
  return bingo(lines, false);
};

console.log("Part 1 answer is: ", bingo(lines)); // 60368
console.log("Part 2 answer is: ", noBingo(lines)); // 17435

module.exports = {
  bingo: bingo,
  noBingo: noBingo,
};
