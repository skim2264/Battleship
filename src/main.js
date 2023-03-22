import Player from "./player";
import "./styles/main.scss";
import {
  createPlayerBoard,
  createComputerBoard,
  populatePlayerBoard,
  populateComputerBoard,
  winScreen,
} from "./DOM";

//create computer player
const player1 = Player("Player1");
player1.isTurn = true;
const player2 = Player("Computer");

//create empty gameboards and allow player to choose where to put their ships
createPlayerBoard(player1);
//populate random fleet of ships if user presses button
const randomShipsBut = document.getElementById("randomShips");
const shipsContainerDiv = document.querySelector(".shipsContainerDiv");

randomShipsBut.addEventListener("click", (e) => {
  player1.playerBoard.autoPlaceShips();
  populatePlayerBoard(player1);
  shipsContainerDiv.innerHTML = "";
  randomShipsBut.style.display = "none";
  createComputerBoard(player2, player1);
  player2.playerBoard.autoPlaceShips();
  populateComputerBoard(player2);
});

export const playGame = () => {
  //computer autopopulates ships on its gameboard
  createComputerBoard(player2, player1);
  player2.playerBoard.autoPlaceShips();
  populateComputerBoard(player2);
};
