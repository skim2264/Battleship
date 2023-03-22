const Ship = require("./ship");

const Gameboard = () => {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let aliveShipSquares = 17;

  const getBoard = () => board;

  const placeShip = (coords, ship) => {
    //return false if any of the coords already has a ship on it
    for (let coord of coords) {
      let x = coord[0];
      let y = coord[1];
      if (board[x][y] != null) return false;
    }

    //place ship if all coords are null
    for (let coord of coords) {
      let x = coord[0];
      let y = coord[1];
      board[x][y] = ship;
    }
  };

  const autoPlaceShips = () => {
    let shipFive = Ship(5);
    let shipFour = Ship(4);
    let shipFirstThree = Ship(3);
    let shipSecondThree = Ship(3);
    let shipTwo = Ship(2);

    let ships = [shipFive, shipFour, shipFirstThree, shipSecondThree, shipTwo];
    let dirList = ["horizontal", "vertical"];

    for (let ship of ships) {
      while (true) {
        let dir = dirList[Math.floor(Math.random() * 2)];
        let coords = [];
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        while (getBoard()[x][y] != null) {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
        }
        coords.push([x, y]);
        //place ship horizontally, only change the x
        if (dir == "horizontal") {
          let otherSide = false;
          for (let i = 1; i < ship.getLength(); i++) {
            if (x < 9 && !otherSide) {
              x += 1;
            } else if (!otherSide) {
              x -= i;
              otherSide = true;
            } else if (otherSide) {
              x -= 1;
            }
            coords.push([x, y]);
          }
        }
        //place ship vertically, only change the y
        else if (dir == "vertical") {
          let otherSide = false;
          for (let i = 1; i < ship.getLength(); i++) {
            if (y < 9 && !otherSide) {
              y += 1;
            } else if (!otherSide) {
              y -= i;
              otherSide = true;
            } else if (otherSide) {
              y -= 1;
            }
            coords.push([x, y]);
          }
        }
        if (placeShip(coords, ship) == false) continue;
        placeShip(coords, ship);
        break;
      }
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

  return { getBoard, placeShip, receiveAttack, allSunk, autoPlaceShips };
};

module.exports = Gameboard;
