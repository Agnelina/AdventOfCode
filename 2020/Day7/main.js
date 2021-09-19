const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay7.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

let bagsDict = {};

lines.forEach((line, i) => {
    // console.log(line);
    const parent = line.split(" bags")[0];
    const kids = line.split("contain ")[1].replace(/,/g, "").replace(/\./g, " ")
        .replace(/bags/g, "bag").split(" bag ").filter(i => i);
    bagsDict[parent] = kids
});

console.log(bagsDict);
const bagName = "shiny gold";

const getParents = (bagName, bagsDict) => {
    let answerSet = new Set();
    for (let key in bagsDict) {
        let values = bagsDict[key];
        for (let i in values){
            if (bagName === values[i].substring(2)){
                answerSet.add(key);
            }
        };
    };
    return answerSet;
};

let answer = getParents(bagName, bagsDict);
let checked = new Set();
let check = new Set(answer);

const eqSet = (as, bs) => {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
};

while (!eqSet(answer, checked)){
    console.log("New iteration");
    check.forEach((bag) => {
        getParents(bag, bagsDict).forEach((el) => {
            answer.add(el)
            check.add(el)
        });
        checked.add(bag);
        check.delete(bag);
    });
};

console.log(answer);
console.log(answer.size); // WUHU correct!!!

const getKids = (bagName, bagsDict) => {
    kids = bagsDict[bagName];
    let count = 0;
    // console.log(bagName);
    // console.log(kids);
    kids.forEach((kid) => {
        console.log(kid);
        if (kid === "no other"){
            count = 0;
        } else {
            multiplyBy = parseInt(kid.substring(0, 1));
            newBagName = kid.substring(2);
            count += multiplyBy;
            count += multiplyBy * getKids(newBagName, bagsDict);
        };
    });
    return count;
};

console.log(getKids(bagName, bagsDict)); // finally correct too :)


module.exports = getParents;