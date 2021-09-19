const fs = require("fs");
const fileContent = fs.readFileSync("./inputDay10.txt");
const getLines = (input) => Buffer.from(input).toString().replace(/\r\n/g, "\n").split("\n");

const lines = getLines(fileContent);

let numbers = [];

lines.forEach((line) => {
    console.log(line);
    numbers.push(parseInt(line));
});

numbers.push(0);

numbers = numbers.sort(function(a, b){return a-b});
console.log(numbers);

const returnJoilts = (numbers) => {
    let joilt1 = 0;
    let joilt3 = 1;

    for (let i = 0; i < numbers.length - 1; i ++){
        if (numbers[i+1]-numbers[i]==1){
            joilt1 += 1
        } else if (numbers[i+1]-numbers[i]==3){
            joilt3 +=1
        }
    };
    return joilt1 * joilt3;
};

console.log("First part answer: ", returnJoilts(numbers)); // 2312

// Antra dalis, kiek yra būdų sujungti adapterius, nuo 0 iki 167+3?
// Visi kurie sujungti po 1 galima pakeisti.
// Kurie jungiasi per 3 išliks.
// Būtinas 0 ir 167, visad bus.
// Galiu konstruoti naujus būdus, dėti į unikalų array ir gauti jo lenght
// Kiekvienam tarpe tarp 3, galiu suskaičiuoti kiek variantų yra ir sudauginti

// Kiek po 1 turiu?
// 1 (1) - nieko negali išmesti (10, 13, 14, 17)
// 2 (2) - 1 gali išmesti (9, 12, 13, 14, 17) -> (9,12,14,17)
// 3 (4) - 2 arba 1 gali išmesti (8, 11, 12, 13, 14, 17) -> (8,11,14,17) / (8,11,12,14,17) / (8,11,13,14,17)
// 4 (7) - (iš 3) 2 arba 1 gali išmesti (24, 27, 28, 29, 30, 31, 34) -> (24,27,30,31,34) / (24,27,28,31,34) / (24,27,29,31,34) /

const countVariations = (numbers) => {
    let joilt1 = 0;
    let answer = 1;

    for (let i = 0; i < numbers.length - 1; i ++){
        if (numbers[i+1]-numbers[i]==1){
            joilt1 += 1;
        } else if (numbers[i+1]-numbers[i]==3){
            console.log(joilt1);
            if (joilt1 == 2){
                answer *= 2;
            } else if (joilt1 == 3){
                answer *= 4;
            } else if (joilt1 == 4){
                answer *= 7;
            }
            joilt1 = 0;
        }
    };

    console.log(joilt1);
    if (joilt1 == 2){
        answer *= 2;
    } else if (joilt1 == 3){
        answer *= 4;
    } else if (joilt1 == 4){
        answer *= 7;
    }


    return answer;
};

console.log(countVariations(numbers)); // 6044831973376 is too low
// 12089663946752 is the right answer


