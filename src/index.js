// import "./styles.css";
import { Ship, Board } from "./objectFactories.js";

console.log("Index script Connected, line 3.");
// console.log(new Ship());

const testShip = new Ship(2);
const testBoard = new Board();
testBoard.createNewBoard();
const testShip2 = new Ship(3);

testBoard.placeShip(3, 4, testShip2);
testBoard.receiveAttack(3, 4);
console.log("test");
