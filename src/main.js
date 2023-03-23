import Player from "./player";
import "./styles/main.scss";
import {
  createPlayerBoard,
  createComputerBoard,
  populatePlayerBoard,
  populateComputerBoard,
  clearBoard,
  winScreen,
} from "./DOM";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
//create computer player
const player1 = Player("Player1");
player1.isTurn = true;
const player2 = Player("Computer");

//create empty gameboards and allow player to choose where to put their ships
createPlayerBoard(player1);
//populate random fleet of ships if user presses button
const randomShipsBut = document.getElementById("randomShips");
const shipsContainerDiv = document.querySelector(".shipsContainerDiv");
const footerDiv = document.getElementById("footer");

randomShipsBut.addEventListener("click", (e) => {
  clearBoard(player1);
  player1.playerBoard.autoPlaceShips();
  populatePlayerBoard(player1);
  playGame();
});

export const playGame = () => {
  shipsContainerDiv.remove();
  randomShipsBut.style.display = "none";
  createComputerBoard(player2, player1);
  player2.playerBoard.autoPlaceShips();
  populateComputerBoard(player2);
  footerDiv.style.display = "flex";
};
