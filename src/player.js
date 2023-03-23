const Gameboard = require("./gameboard");

const Player = (name) => {
  let playerBoard = Gameboard();
  let isTurn = false;

  const getName = () => name;

  const getPlayerBoard = () => playerBoard.getBoard();

  const attack = (player, coord) => {
    return player.playerBoard.receiveAttack(coord);
  };

  const validCoord = (targetPlayer, coord) => {
    let x = coord[0];
    let y = coord[1];
    if (
      targetPlayer.getPlayerBoard()[x][y] == "hit" ||
      targetPlayer.getPlayerBoard()[x][y] == "miss"
    )
      return false;
    return true;
  };

  const autoAttack = (player) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let coord = [x, y];

    while (!validCoord(player, coord)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      coord = [x, y];
    }

    player.playerBoard.receiveAttack(coord);
    return coord;
  };

  return { getName, getPlayerBoard, autoAttack, attack, playerBoard, isTurn };
};

module.exports = Player;
