import Player from "./player";
import "./styles/main.scss";
import { createEmptyBoard, populateBoard, winScreen } from "./DOM";

//create Players and Gameboards
const player1 = Player("Player1");
const player2 = Player("Player2");

//auto populate ships for now on gameboards
player1.playerBoard.autoPlaceShips();
player2.playerBoard.autoPlaceShips();

//display player's board
createEmptyBoard(player1);
populateBoard(player1);

createEmptyBoard(player2);
populateBoard(player2);

//loop through game turn by turn
while (!player1.playerBoard.allSunk() && !player2.playerBoard.allSunk()) {
  player1.autoAttack(player2);
  populateBoard(player2);
  if (player1.playerBoard.allSunk() || player2.playerBoard.allSunk()) break;
  player2.autoAttack(player1);
  populateBoard(player1);
}

//end game once one player's ship has all sunk
if (player1.playerBoard.allSunk()) {
  winScreen(player2);
} else if (player2.playerBoard.allSunk()) {
  winScreen(player1);
}
