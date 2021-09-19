const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay13.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

const arrivalTime = parseInt(lines[0]);
const buslines = lines[1].split(",");
const timeIndexes = [];
for (let i = 0; i < buslines.length; i++){
    if (buslines[i] != "x"){
        timeIndexes.push(i);
    }
}
console.log(timeIndexes);
const busses = lines[1].replace(/x,/g, "").split(",").map(Number);

console.log(arrivalTime);

console.log(busses);

let time = arrivalTime;

while(true){
    let found = false;
    busses.forEach(bus => {
        if (time % parseInt(bus) == 0){
            console.log("First part answer: ", (time - arrivalTime) * bus); // 2947
            found = true;
        }
    });
    if (found) break;
    time += 1;
}

// sufleruoja, kad atsakymas didesnis nei 100 000 000 000 000
// mano pirmas daliklis didžiausio
const findSubsequentBusDeparture = (busses, timeIndexes) => {
    const biggestBus = Math.max(...busses);
    const biggestBusIndex = timeIndexes[busses.indexOf(biggestBus)];
    let multiplication = 2375296912;
    // console.log(biggestBus, biggestBusIndex);
    // let timeSearch = // 999999999908// biggestBus-biggestBusIndex;
    // daugiklis 2375296912 * 421
    while(true){
        const timeSearch = (biggestBus * multiplication) - biggestBusIndex;
        let isCorrect = true;
        for (let i = 0; i < busses.length; i++){
            if ((timeSearch+timeIndexes[i]) % parseInt(busses[i]) != 0){
                isCorrect = false;
            }
        }
        if (isCorrect) {
            console.log(timeSearch);
            return (timeSearch);
            // break;
        }
        multiplication += 1;
        console.log(timeSearch)
    }
};

findSubsequentBusDeparture(busses, timeIndexes); // ilgai sukasi...

module.exports = {
    findSubsequentBusDeparture: findSubsequentBusDeparture 
};
