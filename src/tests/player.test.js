const Player = require("../player");

let player1;
let player2;

beforeEach(() => {
  player1 = Player("John Smith");
  player2 = Player("Bob Brown");
});

test("Creates player with name", () => {
  expect(player1.getName()).toBe("John Smith");
});

test("Attack plot on opponents gameboard with given coordinates", () => {
  player1.attack(player2, [0, 0]);
  expect(player2.getPlayerBoard()[0][0]).not.toBe(null);
});

test("Cannot attack already chosen plot on gameboard", () => {
  player1.attack(player2, [1, 1]);
  player1.attack(player2, [3, 4]);
  expect(player1.attack(player2, [1, 1])).toBe(false);
});

test("Autoattack plot on opponents gameboard", () => {
  let coord = player1.autoAttack(player2);
  expect(player2.getPlayerBoard()[coord[0]][coord[1]]).not.toBe(null);
});
