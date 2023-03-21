const Gameboard = require("./gameboard");

const Player = (name) => {
  let playerBoard = Gameboard();

  const getName = () => name;

  const getPlayerBoard = () => playerBoard.getBoard();

  const attack = (player, coord) => {
    return player.playerBoard.receiveAttack(coord);
  };

  const autoAttack = (player) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let coord = [x, y];

    player.playerBoard.receiveAttack(coord);
    return coord;
  };

  return { getName, getPlayerBoard, autoAttack, attack, playerBoard };
};

module.exports = Player;
