import Ship from "./ship";
import Gameboard from "./gameboard";

const main = document.querySelector("#main");
const body = document.querySelector("body");

export const createComputerBoard = (player) => {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("boardDiv");
  boardDiv.setAttribute("id", player.getName() + "board");
  main.appendChild(boardDiv);
  for (let i = 0; i < 10; i++) {
    const outerdiv = document.createElement("div");
    outerdiv.classList.add("outerdiv");
    boardDiv.appendChild(outerdiv);
    for (let j = 0; j < 10; j++) {
      const innerdiv = document.createElement("div");
      innerdiv.classList.add("innerdiv");
      let coord = player.getName() + i.toString() + j.toString();
      innerdiv.setAttribute("id", coord);
      outerdiv.appendChild(innerdiv);
    }
  }
};

export const createPlayerBoard = (player) => {
  let draggedShip;
  const shipsContainerDiv = document.querySelector(".shipsContainerDiv");

  const configureCoord = (ship, startCoord) => {
    let x = startCoord[0];
    let y = startCoord[1];

    let coords = [startCoord];
    if (
      x > 9 ||
      x < 0 ||
      player.getPlayerBoard()[x][y] != null ||
      y > 9 ||
      y < 0
    )
      return false;
    //go down x-axis if ship is horizontal
    if (draggedShip.classList.contains("turnShip")) {
      for (let i = 1; i < ship.getLength(); i++) {
        x++;
        if (x > 9 || x < 0 || player.getPlayerBoard()[x][y] != null) {
          return false;
        }
        coords.push([x, y]);
      }
    }
    //go down y-axis if ship is vertical
    else {
      for (let i = 1; i < ship.getLength(); i++) {
        y++;
        if (y > 9 || y < 0 || player.getPlayerBoard()[x][y] != null) {
          return false;
        }
        coords.push([x, y]);
      }
    }
    return coords;
  };

  const dragover_handler = (e) => {
    let coords = configureCoord(
      ships[draggedShip.id],
      e.target.id
        .replace(player.getName(), "")
        .split("")
        .map((str) => Number(str))
    );

    if (coords) {
      coords.forEach((coord) => {
        let x = coord[0];
        let y = coord[1];
        let targetId = player.getName() + x + y;
        document.getElementById(targetId).classList.add("hoverGrid");
        setTimeout(
          () => document.getElementById(targetId).classList.remove("hoverGrid"),
          200
        );
      });
    }
    //try to add part to highlight invalid areas in red
    e.preventDefault();
  };

  const drop_handler = (e) => {
    const startCoord = e.target.id
      .replace(player.getName(), "")
      .split("")
      .map((str) => Number(str));
    const ship = ships[draggedShip.id];
    let coords = configureCoord(ship, startCoord);
    if (!coords) return;
    player.playerBoard.placeShip(coords, ship);
    shipsContainerDiv.removeChild(draggedShip);

    populatePlayerBoard(player);
  };

  const dragstart_handler = (e) => {
    e.target.classList.add("dragging");
    draggedShip = e.target;
  };

  const changeDir = (e) => {
    const rotateItem = e.currentTarget;
    rotateItem.classList.toggle("turnShip");
    if (rotateItem.classList.contains("turnShip")) {
      let width = (rotateItem.offsetWidth / 2).toString() + "px";
      rotateItem.style["margin-top"] = width;
      rotateItem.style["margin-bottom"] = width;
    } else {
      rotateItem.style["margin-top"] = 0;
      rotateItem.style["margin-bottom"] = 0;
    }
  };

  const dragend_handler = (e) => {
    e.target.classList.remove("dragging");
  };

  const ship0 = new Ship(5);
  const ship1 = new Ship(4);
  const ship2 = new Ship(3);
  const ship3 = new Ship(3);
  const ship4 = new Ship(2);

  const ships = [ship0, ship1, ship2, ship3, ship4];

  const shipDivs = document.querySelectorAll(".shipDiv");

  for (let shipDiv of shipDivs) {
    shipDiv.addEventListener("dragstart", dragstart_handler);
    shipDiv.addEventListener("dragend", dragend_handler);
    shipDiv.addEventListener("click", changeDir);
  }

  const boardDiv = document.createElement("div");
  boardDiv.classList.add("boardDiv");
  boardDiv.setAttribute("id", player.getName() + "board");
  main.appendChild(boardDiv);
  for (let i = 0; i < 10; i++) {
    const outerdiv = document.createElement("div");
    outerdiv.classList.add("outerdiv");
    boardDiv.appendChild(outerdiv);
    for (let j = 0; j < 10; j++) {
      const innerdiv = document.createElement("div");
      innerdiv.classList.add("innerdiv");
      let coord = player.getName() + i.toString() + j.toString();
      innerdiv.setAttribute("id", coord);
      outerdiv.appendChild(innerdiv);

      innerdiv.addEventListener("dragover", dragover_handler);

      innerdiv.addEventListener("drop", drop_handler);
    }
  }
};

//populate board with data from modules
export const populatePlayerBoard = (player) => {
  let board = player.getPlayerBoard();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coord = player.getName() + i.toString() + j.toString();
      let square = document.getElementById(coord);
      if (board[i][j] == "miss") {
        square.style.backgroundColor = "red";
      } else if (board[i][j] == "hit") {
        square.style.backgroundColor = "red";
        square.innerText = "X";
      } else if (board[i][j] == null) {
      } else if (board[i][j].getLength()) {
        square.style.backgroundColor = "black";
      }
    }
  }
};

//populate computer board so ships are hidden
export const populateComputerBoard = (player) => {
  let board = player.getPlayerBoard();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coord = player.getName() + i.toString() + j.toString();
      let square = document.getElementById(coord);
      if (board[i][j] == "miss") {
        square.style.backgroundColor = "red";
      } else if (board[i][j] == "hit") {
        square.style.backgroundColor = "red";
        square.innerText = "X";
      }
    }
  }
};

//Game over screen
export const winScreen = (player) => {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("gameOverDiv");
  gameOverDiv.innerText = `${player.getName()} wins the Game!`;
  body.appendChild(gameOverDiv);
};
