const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay3.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

// console.log(getLines(fileContent));

const lines = getLines(fileContent);

const calculateTrees = (lines, stepRight, stepDown) => {
    const len = lines[0].length;
    let index = 0;
    let trees = 0;
    let noTrees = 0;
    lines.forEach((line, i) => {
        if (i % stepDown === 0){
            if (index >= len){
                index = index - len;
            }
            if (line[index] === "#"){
                trees += 1;
            } else {
                noTrees += 1;
            }
            index += stepRight;
        }
    });

    return {trees, noTrees: noTrees -1};
};

console.log(calculateTrees(lines, 3, 1))

module.exports = calculateTrees;