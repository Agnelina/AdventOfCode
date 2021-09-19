const {secondPart} = require("./main12");
const testMap = [
    "F10",
    "N3",
    "F7",
    "R90",
    "F11",
];

test("secondPart works correctly", () => {
    expect(secondPart(testMap)).toStrictEqual({shipEast: 214, shipNorth: -72});
});
