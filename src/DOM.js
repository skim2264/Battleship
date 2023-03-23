import Ship from "./ship";
import { playGame } from "./main";

const main = document.querySelector("#main");
const body = document.querySelector("body");

const getCoordFromE = (e, player) => {
  return e.target.id
    .replace(player.getName(), "")
    .split("")
    .map((str) => Number(str));
};

//incorporate into code
export const validCoord = (targetPlayer, coord) => {
  let x = coord[0];
  let y = coord[1];
  if (
    targetPlayer.getPlayerBoard()[x][y] == "hit" ||
    targetPlayer.getPlayerBoard()[x][y] == "miss"
  )
    return false;
  return true;
};

export const createComputerBoard = (compPlayer, opp) => {
  const attack_handler = (e) => {
    let coord = getCoordFromE(e, compPlayer);
    if (opp.isTurn && validCoord(compPlayer, coord)) {
      opp.isTurn = false;
      opp.attack(compPlayer, coord);
      populateComputerBoard(compPlayer);
      if (compPlayer.playerBoard.allSunk()) winScreen(opp);
      compPlayer.autoAttack(opp);
      populatePlayerBoard(opp);
      if (opp.playerBoard.allSunk()) winScreen(compPlayer);
      opp.isTurn = true;
    }
  };

  const boardDiv = document.createElement("div");
  boardDiv.classList.add("boardDiv");
  boardDiv.setAttribute("id", compPlayer.getName() + "board");

  const boardNameDiv = document.createElement("div");
  boardNameDiv.classList.add("boardNameDiv");
  const boardName = document.createElement("h2");
  boardName.innerText = "Enemy Board";
  boardNameDiv.appendChild(boardName);
  boardDiv.appendChild(boardNameDiv);

  main.appendChild(boardDiv);
  for (let i = 0; i < 10; i++) {
    const outerdiv = document.createElement("div");
    outerdiv.classList.add("outerdiv");
    boardDiv.appendChild(outerdiv);
    for (let j = 0; j < 10; j++) {
      const innerdiv = document.createElement("div");
      innerdiv.classList.add("innerdiv");
      let coord = compPlayer.getName() + i.toString() + j.toString();
      innerdiv.setAttribute("id", coord);
      innerdiv.addEventListener("click", attack_handler);

      outerdiv.appendChild(innerdiv);
    }
  }
};

//create player board with all event handlers for dragging and dropping ships
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
      getCoordFromE(e, player)
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
    const startCoord = getCoordFromE(e, player);
    const ship = ships[draggedShip.id];
    let coords = configureCoord(ship, startCoord);
    if (!coords) return;
    player.playerBoard.placeShip(coords, ship);
    shipsContainerDiv.removeChild(draggedShip);

    populatePlayerBoard(player);

    //if all ships are placed, start the game
    if (shipsContainerDiv.children.length == 1) {
      playGame();
    }
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

  const boardNameDiv = document.createElement("div");
  boardNameDiv.classList.add("boardNameDiv");
  const boardName = document.createElement("h2");
  boardName.innerText = "Your Board";
  boardNameDiv.appendChild(boardName);
  boardDiv.appendChild(boardNameDiv);

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
  const autoButton = document.createElement("button");
  autoButton.setAttribute("id", "randomShips");
  autoButton.innerText = "Random Fleet";
  boardDiv.appendChild(autoButton);
};

//populate board with data from modules
export const populatePlayerBoard = (player) => {
  let board = player.getPlayerBoard();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coord = player.getName() + i.toString() + j.toString();
      let square = document.getElementById(coord);
      if (board[i][j] == "miss") {
        square.classList.add("miss");
      } else if (board[i][j] == "hit") {
        square.classList.add("hit");
        square.innerHTML = `<i class="fa-solid fa-xmark fa-2xl"></i>`;
        square.classList.remove("shiponBoard");
      } else if (board[i][j] == null) {
      } else if (board[i][j].getLength()) {
        square.classList.add("shiponBoard");
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
        square.classList.add("miss");
      } else if (board[i][j] == "hit") {
        square.classList.add("hit");
        square.innerHTML = `<i class="fa-solid fa-xmark fa-2xl"></i>`;
      }
    }
  }
};

export const clearBoard = (player) => {
  let board = player.getPlayerBoard();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coord = player.getName() + i.toString() + j.toString();
      let square = document.getElementById(coord);
      board[i][j] = null;
      square.classList.remove("shiponBoard");
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
