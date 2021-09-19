const { count } = require("console");
const { verify } = require("crypto");
const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay11.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

let floorPlan = [];
let floorPlan2 = [];

lines.forEach((line) => {
    floorPlan.push(line.split(""));
    floorPlan2.push(line.split(""));
});

let floorPlanInitial = []; // probably useless
for (i = 0; i < floorPlan.length; i++) {
    floorPlanInitial[i] = [...floorPlan[i]];
}

const findOccupiedAdjancedSeats = (floorPlan, r, c) => {
    const maxR = floorPlan.length;
    const maxC = floorPlan[r].length;
    let count = 0
    if (r-1 >= 0 && c-1 >= 0 && floorPlan[r-1][c-1] == "#") count += 1;
    if (c-1 >=0 && floorPlan[r][c-1] == "#") count += 1;
    if (r+1 < maxR && c-1 >= 0 && floorPlan[r+1][c-1] == "#") count += 1;
    if (r-1 >= 0 && floorPlan[r-1][c] == "#") count += 1;
    if (r+1 < maxR && floorPlan[r+1][c] == "#") count += 1;
    if (r-1 >= 0 && c+1 < maxC && floorPlan[r-1][c+1] == "#") count += 1;
    if (c+1 < maxC && floorPlan[r][c+1] == "#") count += 1;
    if (r+1 < maxR && c+1 < maxC && floorPlan[r+1][c+1] == "#") count += 1;
    return count;
}

const findFirstSeen = (floorPlan, r, c, vertical, horizontal) => {
    const vert = vertical === -1 ? r-1 >= 0 : vertical === 0 ? true : r+1 < floorPlan.length;
    const hori = horizontal === -1 ? c-1 >= 0 : horizontal === 0 ? true : c+1 < floorPlan[r].length;
    if (!vert || !hori) {
        return 0;
    }else if (vert && hori && floorPlan[r+vertical][c+horizontal] == "#") {
        return 1;
    }else if (vert && hori && floorPlan[r+vertical][c+horizontal] == "L"){
        return 0;
    }else{
        return findFirstSeen(floorPlan, r+vertical, c+horizontal, vertical, horizontal);
    }
};

const findOccupiedSeenSeats = (floorPlan, r, c) => {
    // const maxR = floorPlan.length;
    // const maxC = floorPlan[r].length;
    let count = 0
    count += findFirstSeen(floorPlan, r, c, -1, -1);
    // if (r-1 >= 0 && c-1 >= 0 && floorPlan[r-1][c-1] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, 0, -1);
    // if (c-1 >=0 && floorPlan[r][c-1] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, 1, -1);
    // if (r+1 < maxR && c-1 >= 0 && floorPlan[r+1][c-1] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, -1, 0);
    // if (r-1 >= 0 && floorPlan[r-1][c] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, 1, 0);
    // if (r+1 < maxR && floorPlan[r+1][c] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, -1, 1);
    // if (r-1 >= 0 && c+1 < maxC && floorPlan[r-1][c+1] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, 0, 1);
    // if (c+1 < maxC && floorPlan[r][c+1] == "#") count += 1;
    count += findFirstSeen(floorPlan, r, c, 1, 1);
    // if (r+1 < maxR && c+1 < maxC && floorPlan[r+1][c+1] == "#") count += 1;
    return count;
}

const seatingChanges = ({floorPlan, part2}) => {
    let newPlan = [];
    for (i = 0; i < floorPlan.length; i++) {
        newPlan[i] = [...floorPlan[i]];
    }
    let isChanging = false;
    const howMuch = part2 ? 5 : 4;


    for (let i = 0; i < floorPlan.length; i ++){
        for(let j = 0; j < floorPlan[i].length; j++){
            if (floorPlan[i][j] == "."){
            } else {
                const count = part2 ? findOccupiedSeenSeats(floorPlan, i, j) : findOccupiedAdjancedSeats(floorPlan, i, j);
                if (floorPlan[i][j] == "L" && count == 0) {
                    newPlan[i][j] = "#";
                    isChanging = true;
                }
                if (floorPlan[i][j] == "#" && count >= howMuch) {
                    newPlan[i][j] = "L";
                    isChanging = true;
                }
            }
        }
    }
    return {isChanging, newPlan}
};

const countFinalTakesSeats = (floorPlan) => {
    let count = 0;
    for (let i = 0; i < floorPlan.length; i ++){
        for(let j = 0; j < floorPlan[i].length; j++){
            if (floorPlan[i][j] == "#") count +=1;
        }
    }
    return count;
}

while (true){
    const {isChanging, newPlan} = seatingChanges({floorPlan});
    floorPlan = newPlan;
    if (!isChanging) break;
}

console.log("PART 1 ANSWER", countFinalTakesSeats(floorPlan)); // 2093 correct, wuhu!

while (true){
    const {isChanging, newPlan} = seatingChanges({floorPlan: floorPlan2, part2: true});
    floorPlan2 = newPlan;
    if (!isChanging) break;
}

console.log("PART 2 ANSWER", countFinalTakesSeats(floorPlan2)); // 1862  correct again, wuhu!



module.exports = { 
    findOccupiedAdjancedSeats: findOccupiedAdjancedSeats, 
    findOccupiedSeenSeats: findOccupiedSeenSeats 
};
