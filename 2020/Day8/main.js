const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay8.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

let codeLines = [];

lines.forEach((line) => {
    // console.log(line);
    codeLines.push(line);
});

const runProgram = (code) => {
    let accValue = 0;
    let index = 0;
    let seenBefore = [];
    for (let i = 0; i < code.length; i++) seenBefore.push(0);
    while(true){
        if (seenBefore[index] == 1){
            console.log("ANSWER PART 1", accValue);
            return accValue;
        } else if (index >= code.length){
            console.log("ANSWER BY END", accValue);
            return accValue;
        }
        seenBefore[index] = 1
        let command = code[index].substring(0,3);
        let commandValue = parseInt(code[index].substring(3));
        if (command === "nop"){
            index += 1;
        } else if (command === "acc"){
            accValue += commandValue;
            index+=1;
        } else {
            // jump
            index += commandValue;
        }
    }
};

codeLines.forEach((line, i) => {
    let command = line.substring(0,3);
    const codeSnap = [...codeLines];
    if (command === "nop"){
        codeSnap[i] = codeSnap[i].replace("nop", "jmp");
        runProgram(codeSnap);
    } else if (command === "jmp"){
        codeSnap[i] = codeSnap[i].replace("jmp", "nop");
        runProgram(codeSnap);
    }
});

runProgram(codeLines);



// module.exports = getParents;