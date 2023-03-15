const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay5.txt");
const GetLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = GetLines(fileContent);

const fillMapWithVents = (lines, map) => {
  lines.forEach((line) => {
    const ventLine = line.split(" -> ");
    const start = ventLine[0].split(",");
    const end = ventLine[1].split(",");
    if (start[0] === end[0]) {
      // console.log("LINE -", line);
      if (start[1] < end[1]) {
        for (i = start[1]; i <= end[1]; i++) {
          map[start[0]][i] += 1;
        }
      } else {
        for (i = end[1]; i <= start[1]; i++) {
          map[start[0]][i] += 1;
        }
      }
    } else if (start[1] === end[1]) {
      // console.log("LINE |", line);
      if (start[0] < end[0]) {
        for (i = start[0]; i <= end[0]; i++) {
          map[i][start[1]] += 1;
        }
      } else {
        for (i = end[0]; i <= start[0]; i++) {
          map[i][start[1]] += 1;
        }
      }
    }
    // else {
    //   console.log("Discarded line: ", line);
    // }
  });

  return map;
};

const atLeastTwo = (map) => {
  let answer = 0;

  map.forEach((row) => {
    row.forEach((coordinate) => {
      if (coordinate >= 2) {
        // console.log(row);
        answer += 1;
      }
    });
  });

  return answer;
};

const findOverlaps = (lines, size) => {
  let map = Array(size);
  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(size).fill(0);
  }

  map = fillMapWithVents(lines, map);
  let answer = atLeastTwo(map);

  // console.log(map);

  return answer;
};

const internetSolution = (file) => {
  const inputs = file
    .split("\n")
    .slice(0, -1)
    .map((line) =>
      line
        .replace(" -> ", ",")
        .split(",")
        .map((n) => Number(n))
    );
  const inputs1 = [...inputs];
  let count = 0;

  let board = Array(1000);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(1000).fill(0);
  }

  while (inputs1.length) {
    let [x1, y1, x2, y2] = inputs1.shift();

    if (x1 != x2 && y1 != y2) continue; // diagonal

    if (x1 > x2) [x1, x2] = [x2, x1];
    if (y1 > y2) [y1, y2] = [y2, y1];

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (board[y][x] == 1) count++;
        board[y][x]++;
      }
    }
  }

  console.log(`Answer 1: ${count}`);
};

console.log("Part 1 answer is: ", findOverlaps(lines, 1000)); // 3941 your answer is too low

const { join } = require("path");
const file = fs.readFileSync(join("./inputDay5.txt"), "utf8");
internetSolution(file); // 4684

module.exports = {
  findOverlaps: findOverlaps,
};
