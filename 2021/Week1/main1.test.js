const { execPath } = require("process");
const { calculateIncreases, calculateGroupIncreases } = require("./main1");
const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

test("Simple test for calculateIncreases function", () => {
  expect(calculateIncreases(testInput)).toStrictEqual(7);
});

test("Simple test for calculateGroupIncreases function", () => {
  expect(calculateGroupIncreases(testInput)).toStrictEqual(5);
});
