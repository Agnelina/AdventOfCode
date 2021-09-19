const {findSubsequentBusDeparture} = require("./main13");
const busses = [ 7, 13, 59, 31, 19];
const indexes = [ 0, 1, 4, 6, 7];

test("findSubsequentBusDeparture works correctly", () => {
    expect(findSubsequentBusDeparture(busses, indexes)).toStrictEqual(1068781);
});
