const { findSubsequentBusDeparture, ChineseRemainder } = require("./main13");

const numbers = [3, 5, 7];
const remainders = [2, 3, 2];

test("ChineseRemainder works correctly 0", () => {
  expect(ChineseRemainder(numbers, remainders)).toStrictEqual(23);
});

const busses = [7, 13, 59, 31, 19];
const indexes = [0, 1, 4, 6, 7];

const busses1 = [17, 13, 19];
const indexes1 = [0, 2, 3];

const busses2 = [67, 7, 59, 61];
const indexes2 = [0, 1, 2, 3];

const busses3 = [67, 7, 59, 61];
const indexes3 = [0, 2, 3, 4];

const busses4 = [67, 7, 59, 61];
const indexes4 = [0, 1, 3, 4];

const busses5 = [1789, 37, 47, 1889];
const indexes5 = [0, 1, 2, 3];

test("findSubsequentBusDeparture works correctly", () => {
  expect(findSubsequentBusDeparture(busses, indexes)).toStrictEqual(1068781);
  expect(findSubsequentBusDeparture(busses1, indexes1)).toStrictEqual(3417);
  expect(findSubsequentBusDeparture(busses2, indexes2)).toStrictEqual(754018);
  expect(findSubsequentBusDeparture(busses3, indexes3)).toStrictEqual(779210);
  expect(findSubsequentBusDeparture(busses4, indexes4)).toStrictEqual(1261476);
  expect(findSubsequentBusDeparture(busses5, indexes5)).toStrictEqual(
    1202161486
  );
});
