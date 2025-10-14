function printBoard(board) {
  console.log("TIC TAC TOE")
  for (let index = 0; index < board.length; index++) {
    console.log(board[index].join(" |"));
    if (index < 2) {
      console.log("---------");
    }
  }
}
function isBoardFull(board) {
  for (let index = 0; index < 3; index++) {
    for (let innnerIndex = 0; innnerIndex < 3; innnerIndex++) {
      if (board[index][innnerIndex] === " ") {
        return false;
      }
    }
  }
  return true;
}

function play() {
  let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  printBoard(board);
  let player = "X";
  while (!isBoardFull(board)) {
    console.log("current player:", player);
    const row = prompt("enter row");
    const coloumn = prompt("enter coloumn");
    board[row][coloumn] = " " + player;
    printBoard(board);

  }
  console.log("board is full");
}
play();
