const {
  calculateMaskedValue,
  calculateDictionarySum,
  createDictionary,
} = require("./main14");

const mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
const dict = { 8: 64, 7: 101 };
const lines = [
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
  "mem[8] = 11",
  "mem[7] = 101",
  "mem[8] = 0",
];

describe("calculateMaskedValue", () => {
  test("returns a correct answer for input 11", () => {
    expect(calculateMaskedValue(mask, 11)).toStrictEqual(73);
  });
  test("returns a correct answer for string 11", () => {
    expect(calculateMaskedValue(mask, "11")).toStrictEqual(73);
  });
  test("returns a correct answer for input 101", () => {
    expect(calculateMaskedValue(mask, 101)).toStrictEqual(101);
  });
  test("returns a correct answer for input 0", () => {
    expect(calculateMaskedValue(mask, 0)).toStrictEqual(64);
  });
});

describe("calculateDictionarySum", () => {
  test("returns a correct sum of given dictionary", () => {
    expect(calculateDictionarySum(dict)).toStrictEqual(165);
  });
});

describe("createDictionary", () => {
  test("creates a correct dictionary", () => {
    expect(createDictionary(lines)).toStrictEqual(dict);
  });
});
