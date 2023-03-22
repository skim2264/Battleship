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
const player2 = Player("Computer");

//create empty gameboards and allow player to choose where to put their ships
createPlayerBoard(player1);
//player1.playerBoard.autoPlaceShips();

const playGame = () => {
  //computer autopopulates ships on its gameboard
  createComputerBoard(player2);
  player2.playerBoard.autoPlaceShips();
  //remove shipsDiv from display

  //display gameboards
  populatePlayerBoard(player1);
  populateComputerBoard(player2);

  //loop through game turn by turn
  while (!player1.playerBoard.allSunk() && !player2.playerBoard.allSunk()) {
    player1.autoAttack(player2);
    populateComputerBoard(player2);

    if (player1.playerBoard.allSunk() || player2.playerBoard.allSunk()) break;
    player2.autoAttack(player1);
    populatePlayerBoard(player1);
  }

  //end game once one player's ship has all sunk
  if (player1.playerBoard.allSunk()) {
    winScreen(player2);
  } else if (player2.playerBoard.allSunk()) {
    winScreen(player1);
  }
};
