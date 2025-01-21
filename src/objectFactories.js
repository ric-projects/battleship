export { Ship, Board };
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
    } else if (this.board[x][y].empty == false) {
      this.board[x][y].ship.hit();
    }
  }

  anyRemainingShips() {}
}

// const testBoard = new Board();
// testBoard.createNewBoard();
// console.log("test");
