const { execPath } = require("process");
const { calculatePowerConsumption, calculateLifeSupport } = require("./main3");
const testInput = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

test("Simple test for calculatePowerConsumption", () => {
  expect(calculatePowerConsumption(testInput)).toStrictEqual(198);
});

test("Simple test for calculateLifeSupport", () => {
  expect(calculateLifeSupport(testInput)).toStrictEqual(230);
});
