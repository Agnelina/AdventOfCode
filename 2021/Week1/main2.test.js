const { execPath } = require("process");
const { calculatePosition, calculatePosition2 } = require("./main2");
const testInput = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

test("Simple test to calculate position for part one", () => {
  expect(calculatePosition(testInput)).toStrictEqual(150);
});

test("Simple test to calculate position for part two", () => {
  expect(calculatePosition2(testInput)).toStrictEqual(900);
});
