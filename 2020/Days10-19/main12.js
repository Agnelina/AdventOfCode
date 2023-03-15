const fs = require("fs");
const { join } = require("path");
const fileContent = fs.readFileSync("./inputDay12.txt");
const getLines = (input) =>
  Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

const instructions = [];

lines.forEach((line) => {
  // console.log(line);
  instructions.push(line);
});

const firstPart = (instructions) => {
  let east = 0;
  let north = 0;
  let direction = ["E", "S", "W", "N"];

  instructions.forEach((instruction) => {
    const instr = instruction[0];
    const value = parseInt(instruction.slice(1));
    // console.log(instr, value);
    if (instr === "N") {
      north += value;
    } else if (instr === "S") {
      north -= value;
    } else if (instr === "E") {
      east += value;
    } else if (instr === "W") {
      east -= value;
    } else if (instr === "L") {
      const index = value / 90;
      direction = [...direction.slice(-index), ...direction.slice(0, -index)];
    } else if (instr === "R") {
      const index = value / 90;
      // console.log(value, index);
      // console.log(direction);
      direction = [...direction.slice(index), ...direction.slice(0, index)];
      // console.log(direction);
    } else {
      // if (instr == "F"){
      if (direction[0] === "N") {
        north += value;
      } else if (direction[0] === "S") {
        north -= value;
      } else if (direction[0] === "E") {
        east += value;
      } else if (direction[0] === "W") {
        east -= value;
      }
    }
    // console.log(east, north);
  });
  return { east, north };
};

const { east, north } = firstPart(instructions);

console.log("Move east: ", east);
console.log("Move noth: ", north);

const secondPart = (instructions) => {
  let shipEast = 0;
  let shipNorth = 0;
  let wayEast = 10;
  let wayNorth = 1;
  // let direction = ["E", "S", "W", "N"];

  instructions.forEach((instruction) => {
    const instr = instruction[0];
    const value = parseInt(instruction.slice(1));
    // console.log(instr, value);
    if (instr === "N") {
      wayNorth += value;
    } else if (instr === "S") {
      wayNorth -= value;
    } else if (instr === "E") {
      wayEast += value;
    } else if (instr === "W") {
      wayEast -= value;
    } else if (instr === "L") {
      const tempE = wayEast;
      if (value === 90) {
        wayEast = wayNorth * -1;
        wayNorth = tempE;
      } else if (value === 180) {
        wayEast = wayEast * -1;
        wayNorth = wayNorth * -1;
      } else if (value === 270) {
        wayEast = wayNorth;
        wayNorth = tempE * -1;
      }
    } else if (instr === "R") {
      const tempE = wayEast;
      if (value === 90) {
        wayEast = wayNorth;
        wayNorth = tempE * -1;
      } else if (value === 180) {
        wayEast = wayEast * -1;
        wayNorth = wayNorth * -1;
      } else if (value === 270) {
        wayEast = wayNorth * -1;
        wayNorth = tempE;
      }
    } else {
      // if (instr == "F")
      shipEast += value * wayEast;
      shipNorth += value * wayNorth;
    }
    // console.log(wayEast, wayNorth);
    // console.log(shipEast, shipNorth);
  });
  return { shipEast, shipNorth };
};

const { shipEast, shipNorth } = secondPart(instructions);

console.log("Move east: ", shipEast);
console.log("Move noth: ", shipNorth); // 44379 is not the right answer, but 62434 is

module.exports = {
  secondPart: secondPart,
};
