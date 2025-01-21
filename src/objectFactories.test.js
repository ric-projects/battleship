import { describe, expect, test } from "@jest/globals";
import { Ship, Board } from "./objectFactories.js";
// describe("sum module", () => {
//   test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });

const testShip = new Ship(2);
const testBoard = new Board();
testBoard.createNewBoard();
const testShip2 = new Ship(3);

test("Test Ship", () => {
  expect(testShip.hits).toBe(0);
  expect(testShip.hit()).toBe(undefined);
  expect(testShip.hits).toBe(1);
  expect(testShip.isSunk()).toBe(false);
  expect(testShip.hit()).toBe(undefined);
  expect(testShip.isSunk()).toBe(true);
});

test("Test Board", () => {
  expect(testBoard.board[8][8]).toStrictEqual({
    empty: true,
    missedShot: false,
    ship: null,
    isShot: false,
  }); /*check boardsize and placement*/
  expect(testBoard.placeShip(3, 4, testShip2)).toBe(undefined);
  expect(testBoard.board[3][4].empty).toBe(false);
  expect(testBoard.board[3][4].ship.length).toBe(3);

  expect(testBoard.receiveAttack(3, 4)).toBe();
  expect(testBoard.board[3][4].empty).toBe(false);
  expect(testBoard.board[3][5].empty).toBe(false);
  expect(testBoard.board[3][4].isShot).toBe(true);
  expect(testBoard.board[3][5].isShot).toBe(false);

  expect(testBoard.receiveAttack(4, 4)).toBe();

  expect(testBoard.anyRemainingShips()).toBe(true);
});
