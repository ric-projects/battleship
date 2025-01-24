// import { player1, player2 } from "./index.js";
// import { Player } from "./objectFactories.js";
export { renderBoard, p1Board, p2Board, declareWinner };
import { attack, newGame, placeShip, player2 } from "./objectFactories.js";

// const p1 = player1;
// const p2 = player2;

// const player1 = new Player("player 1", false);
// player1.board.createNewBoard();
// const player2 = new Player("pc", true);
// player2.board.createNewBoard();

function clearBoard(player, whichBoard) {
  if (document.querySelector(".div") != null) {
    let boardWrap;
    whichBoard == "p1"
      ? (boardWrap = document.querySelector(".boardP1"))
      : (boardWrap = document.querySelector(".boardP2"));
    while (boardWrap.hasChildNodes()) {
      boardWrap.removeChild(boardWrap.firstChild);
    }
    // for (let i = 0; i < player.board.board.length; i++) {
    //   const div = document.querySelector(".div");
    //   div.remove();
    // }
  }
}

function renderBoard(player, board) {
  board.className == "boardP1"
    ? clearBoard(player, "p1")
    : clearBoard(player, "p2");
  //   clearBoard(player);
  for (let i = 0; i < player.board.board.length; i++) {
    const div = document.createElement("div");
    div.id = "r" + i;
    div.classList.add("div");

    for (let j = 0; j < player.board.board[i].length; j++) {
      const div2 = document.createElement("div2");
      div2.id = "r" + i + j;
      div2.classList.add("div2");

      if (board.className == "boardP2") {
        div2.addEventListener("click", () => {
          attack(i, j, player2, p2Board);
        });
      }

      if (player.board.board[i][j].empty == false) {
        if (player.board.board[i][j].missedShot === true)
          div2.textContent = "00";
        if (
          player.board.board[i][j].ship !== null &&
          board.className != "boardP2"
        )
          div2.textContent = "S";
        if (
          player.board.board[i][j].ship != null &&
          player.board.board[i][j].isShot === true
        )
          div2.textContent = "XX";
      }
      div.appendChild(div2);
    }
    board.appendChild(div);
  }
}

function declareWinner(player) {
  instructions.textContent = `${player} won this round.`;
}

const p1Board = document.querySelector(".boardP1");
const p2Board = document.querySelector(".boardP2");

const instructions = document.querySelector(".instructions");
const newGameBtn = document.querySelector(".newGame");
newGameBtn.addEventListener("click", () => {
  newGame();
  instructions.textContent = `P1's turn`;
});
// renderBoard(player1, p1Board);

// player1.board.receiveAttack(3, 4);
// renderBoard(player1, p1Board);
