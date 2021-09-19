const { execPath } = require("process");
const calculateTrees = require("./main");
const testInput = ["....#..#", "..##.#.#", "....#.#.", "........"];
const testInput2 = [
    "....#..#",
    "..##.#.#",
    "....#.#.",
    "........",
    "....#..#",
    "..##.#.#",
    "....#.#.",
    "........",
    "........"
];

test("Simple test for calculateTrees function", () => {
    expect(calculateTrees(testInput, 3, 1)).toStrictEqual({trees: 2, noTrees: 1 });
});