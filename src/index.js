// import "./styles.css";
import { Ship, Board, Player } from "./objectFactories.js";
import { renderBoard } from "./DOMModule.js";
// export { player1 , player2 };

console.log("Index script Connected, line 3.");
// console.log(new Ship());

// const testShip = new Ship(2);
// const testBoard = new Board();
// testBoard.createNewBoard();
// const testShip2 = new Ship(3);

// testBoard.placeShip(3, 4, testShip2);
// testBoard.receiveAttack(3, 4);
// testBoard.anyRemainingShips();

const p1Board = document.querySelector(".boardP1");
const p2Board = document.querySelector(".boardP2");

const player1 = new Player("player 1", false);
player1.board.createNewBoard();
const player2 = new Player("pc", true);
player2.board.createNewBoard();

renderBoard(player1, p1Board);
renderBoard(player2, p2Board);

console.log("test");
