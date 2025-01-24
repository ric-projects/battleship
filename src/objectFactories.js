export { Ship, Board, Player, attack, placeShip, newGame, player2, randomNo };
// To comment the import lines when running tests, it imports DOM Modules
import { renderBoard, p1Board, p2Board, declareWinner } from "./DOMModule.js";

// let p2board = p2Board;

console.log("objfac module connected");

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
    if (this.hits > this.length) this.sunk = true;
  }
  isSunk() {
    return this.hits >= this.length ? (this.sunk = true) : (this.sunk = false);
  }
}

class Board {
  constructor() {
    this.board = [];
    this.allSunk = false;
  }

  createNewBoard() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i].push({
          empty: true,
          missedShot: false,
          ship: null,
          isShot: false,
        });
      }
    }
  }

  placeShip(x, y, ship, direction) {
    if (this.board[x][y].empty == true) {
      this.board[x][y].empty = false;
      this.board[x][y].ship = ship;
      if (!direction || direction == "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          this.board[x][y + i].ship = ship;
          this.board[x][y + i].empty = false;
        }
      } else if (direction == "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y].ship = ship;
          this.board[x + i][y].empty = false;
        }
      }
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y].empty == true) {
      this.board[x][y].empty = false;
      this.board[x][y].missedShot = true;
    } else if (
      this.board[x][y].empty === false &&
      this.board[x][y].missedShot === false
    ) {
      this.board[x][y].ship.hit();
      this.board[x][y].isShot = true;
    }
  }

  anyRemainingShips() {
    if (this.board.allSunk == true) return false;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j].empty == false &&
          this.board[i][j].missedShot === false
        ) {
          if (this.board[i][j].ship.isSunk() == false) return true;
        }
      }
    }
    return false;
  }
}

class Player {
  constructor(name, auto) {
    this.name = name;
    this.automated = auto;
    this.board = new Board();
    this.turn = true;
  }

  // switchTurns() {
  //   if (this.turn == true) this.turn = false;
  // }
}

function attack(x, y, p2, DOMboard, run = 0) {
  if (
    p2.board.board[x][y].isShot === false &&
    p2.board.board[x][y].missedShot === false
  ) {
    p2.board.receiveAttack(x, y);
    renderBoard(p2, DOMboard);
    if (p2.board.anyRemainingShips() === false) {
      let winner;
      DOMboard.className == "boardP2" ? (winner = "P1") : (winner = "CPU");
      declareWinner(winner);
    }
    // call gamedriver for turn and pc run
    if (run == 0) {
      run++;
      let x, y;
      x = randomNo();
      y = randomNo();
      while (
        player1.board.board[x][y].missedShot === true ||
        player1.board.board[x][y].isShot === true
      ) {
        x = randomNo();
        y = randomNo();
      }
      attack(x, y, player1, p1Board, run);
    }
  }
}

function placeShip(x, y, length, player, DOMboard) {
  if (y + length > 9) y = 10 - length;
  const newShip = new Ship(length);
  player.board.placeShip(x, y, newShip);
  renderBoard(player, DOMboard);
}

let player2, player1;

function newGame() {
  player1 = new Player("player 1", false);
  player1.board.createNewBoard();
  // To add placement randomizer
  randomizeShips(player1, p1Board);

  renderBoard(player1, p1Board);
  player2 = new Player("pc", true);
  player2.board.createNewBoard();
  // to add cpu plac randomizer
  randomizeShips(player2, p2Board);
  renderBoard(player2, p2Board);

  return { player1, player2 };
}

function randomNo() {
  return Math.round(Math.random() * 9);
}

function randomizeShips(player, DOMboard) {
  const shipSizes = [2, 3, 3, 4, 5];
  let x, y;
  let previousX = [];
  for (let i = 0; i < shipSizes.length; i++) {
    x = randomNo();
    y = randomNo();
    if (y + i > 9) y = 9 - i;
    while (
      player.board.board[x][y].empty === false ||
      previousX.includes(x) === true
    ) {
      x = randomNo();
      y = randomNo();
    }
    previousX.push(x);
    placeShip(x, y, shipSizes[i], player, DOMboard);
    // console.log(x, y, player);
  }
}

// function gameDriver() {
//   // let x, y;

// }
