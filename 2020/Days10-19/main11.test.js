const {findOccupiedAdjancedSeats, findOccupiedSeenSeats} = require("./main11");
const testMap = [
    "#.##.L#.##",
    "#L###LL.L#",
    "L.#.#..#..",
    "#L##.##.L#",
    "#.##.LL.LL",
    "#.###L#.##",
    "..#.#.....",
    "#L######L#",
    "#.LL###L.L",
    "#.#L###.##"
];

test("findOccupiedAdjancedSeats works correctly", () => {
    expect(findOccupiedAdjancedSeats(testMap, 0, 1)).toStrictEqual(4);
});

test("findOccupiedSeenSeats works correctly", () => {
    expect(findOccupiedSeenSeats(testMap, 6, 1)).toStrictEqual(5);
});