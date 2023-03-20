const Gameboard = () => {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let aliveShipSquares = 17;

  const getBoard = () => board;

  const placeShip = (coords, ship) => {
    //return false if any of the coords already has a ship on it
    for (coord of coords) {
      let x = coord[0];
      let y = coord[1];
      if (board[x][y] != null) return false;
    }

    //place ship if all coords are null
    for (coord of coords) {
      let x = coord[0];
      let y = coord[1];
      board[x][y] = ship;
    }
  };

  const receiveAttack = (coord) => {
    let x = coord[0];
    let y = coord[1];
    if (board[x][y] == null) {
      board[x][y] = "miss";
    } else if (board[x][y] == "hit" || board[x][y] == "miss") {
      return false;
    } else {
      board[x][y].hit();
      aliveShipSquares -= 1;
      board[x][y] = "hit";
    }
  };

  const allSunk = () => {
    if (aliveShipSquares == 0) return true;
    return false;
  };

  return { getBoard, placeShip, receiveAttack, allSunk };
};

module.exports = Gameboard;
