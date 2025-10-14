function printBoard(board) {
  console.log("TIC TAC TOE")
  for (let index = 0; index < board.length; index++) {
    console.log(board[index].join(" |"));
    if (index < 2) {
      console.log("------------");
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

function checkWinner(board) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== " " && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }
  // Cols
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  // Diagonally
  if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  return null;
}

function play(board, player, winner) {
  while (!isBoardFull(board)) {
    console.log("\tCURRENT PLAYER:", player);
    const row = parseInt(prompt("enter row"));
    const coloumn = parseInt(prompt("enter coloumn"));

    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      console.log("Invalid input! Please enter numbers between 0 and 2.");
      continue;
    }

    if (board[row][coloumn] !== " ") {
      console.log("ENTERED PLACE IS ALREADY TAKEN");
      continue;
    }
    board[row][coloumn] = " " + player;
    console.clear();
    printBoard(board);
    winner = checkWinner(board);

    if (winner !== null) {
      console.log("Player " + winner + " wins! 🎉");
      return;
    }
    player = player === "X" ? "O" : "X";
  }
  console.log("It's a draw!");
}

function start() {
  let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  printBoard(board);
  let player = "X";
  let winner;
  play(board, player, winner);
}
start();
