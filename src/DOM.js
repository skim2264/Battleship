const main = document.querySelector("#main");
const body = document.querySelector("body");

//create Empty gameboard
export const createEmptyBoard = (player) => {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("boardDiv");
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

//populate board with data from modules
export const populateBoard = (player) => {
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

//Game over screen
export const winScreen = (player) => {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("gameOverDiv");
  gameOverDiv.innerText = `${player.getName()} wins the Game!`;
  body.appendChild(gameOverDiv);
};
