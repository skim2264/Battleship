const Gameboard = require("../gameboard");
const Ship = require("../ship");

let newGameboard = Gameboard();
let shipFive = Ship(5);
let shipFour = Ship(4);
let shipFirstThree = Ship(3);
let shipSecondThree = Ship(3);
let shipTwo = Ship(2);

afterEach(() => {
  newGameboard = Gameboard();
  shipFive = Ship(5);
  shipFour = Ship(4);
  shipFirstThree = Ship(3);
  shipSecondThree = Ship(3);
  shipTwo = Ship(2);
});

test("Create 10x10 gameboard", () => {
  expect(
    newGameboard.getBoard().length && newGameboard.getBoard()[0].length
  ).toBe(10);
});

test("Places ship at specific coord coordinates by calling Ship factory function", () => {
  newGameboard.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    shipFirstThree
  );
  expect(
    newGameboard.getBoard()[0][0] &&
      newGameboard.getBoard()[0][1] &&
      newGameboard.getBoard()[0][2]
  ).toBe(shipFirstThree);
});

describe("receiveAttack() function", () => {
  beforeEach(() => {
    newGameboard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      shipFive
    );
    newGameboard.placeShip(
      [
        [2, 3],
        [2, 4],
        [2, 5],
        [2, 6],
      ],
      shipFour
    );
    newGameboard.placeShip(
      [
        [5, 0],
        [6, 0],
        [7, 0],
      ],
      shipFirstThree
    );
    newGameboard.placeShip(
      [
        [9, 1],
        [8, 1],
        [7, 1],
      ],
      shipSecondThree
    );
    newGameboard.placeShip(
      [
        [7, 5],
        [7, 6],
      ],
      shipTwo
    );
  });

  test("Records coordinates of missed shot", () => {
    newGameboard.receiveAttack([3, 4]);
    expect(newGameboard.getBoard()[3][4]).toBe("miss");
  });

  test("Determines if ship was hit correctly", () => {
    newGameboard.receiveAttack([2, 3]);
    expect(newGameboard.getBoard()[2][3]).toBe("hit");
  });

  test("Cannot hit already hit spot", () => {
    newGameboard.receiveAttack([7, 5]);
    expect(newGameboard.receiveAttack([7, 5])).toBe(false);
  });

  test("Report if ships have not all sunk", () => {
    newGameboard.receiveAttack([7, 5]);
    expect(newGameboard.allSunk()).toBe(false);
  });

  test("Report if all ships have sunk", () => {
    newGameboard.receiveAttack([0, 1]);
    newGameboard.receiveAttack([0, 2]);
    newGameboard.receiveAttack([0, 3]);
    newGameboard.receiveAttack([0, 4]);
    newGameboard.receiveAttack([0, 0]);
    newGameboard.receiveAttack([2, 3]);
    newGameboard.receiveAttack([2, 4]);
    newGameboard.receiveAttack([2, 5]);
    newGameboard.receiveAttack([2, 6]);
    newGameboard.receiveAttack([5, 0]);
    newGameboard.receiveAttack([6, 0]);
    newGameboard.receiveAttack([7, 0]);
    newGameboard.receiveAttack([9, 1]);
    newGameboard.receiveAttack([8, 1]);
    newGameboard.receiveAttack([7, 1]);
    newGameboard.receiveAttack([7, 5]);
    newGameboard.receiveAttack([7, 6]);

    expect(newGameboard.allSunk()).toBe(true);
  });
});
