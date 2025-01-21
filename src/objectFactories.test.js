import { describe, expect, test } from "@jest/globals";
import { Ship, Board, Player } from "./objectFactories.js";

const testShip = new Ship(2);
const testBoard = new Board();
testBoard.createNewBoard();
const testShip2 = new Ship(3);
const player1 = new Player("player 1", false);
player1.board.createNewBoard();
const player2 = new Player("pc", true);
player2.board.createNewBoard();

test("Test Ship", () => {
  expect(testShip.hits).toBe(0);
  expect(testShip.hit()).toBe(undefined);
  expect(testShip.hits).toBe(1);
  expect(testShip.isSunk()).toBe(false);
  expect(testShip.hit()).toBe(undefined);
  expect(testShip.isSunk()).toBe(true);
});

test("Test Board", () => {
  // check boardsize and placement
  expect(testBoard.board[8][8]).toStrictEqual({
    empty: true,
    missedShot: false,
    ship: null,
    isShot: false,
  });
  expect(testBoard.anyRemainingShips()).toBe(true);

  // Places a ship
  expect(testBoard.placeShip(3, 4, testShip2)).toBe(undefined);
  expect(testBoard.board[3][4].empty).toBe(false);
  expect(testBoard.board[3][4].ship.length).toBe(3);

  expect(testBoard.receiveAttack(3, 4)).toBe();
  expect(testBoard.board[3][4].empty).toBe(false);
  expect(testBoard.board[3][5].empty).toBe(false);
  expect(testBoard.board[3][4].isShot).toBe(true);
  expect(testBoard.board[3][5].isShot).toBe(false);

  // testing missed shots
  expect(testBoard.receiveAttack(4, 4)).toBe(undefined);

  expect(testBoard.anyRemainingShips()).toBe(true);
});

test("Player class", () => {
  expect(player1.board.allSunk).toBe(false);

  expect(player2.board.board[3][4].empty).toBe(true);
});
