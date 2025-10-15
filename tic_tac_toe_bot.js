function printBoard(board) {
  console.log("TIC TAC TOE")
  for (let index = 0; index < board.length; index++) {
    console.log(board[index].join(" | "));
    if (index < 2) {
      console.log("-------------");
    }
  }
}

function checkWinner(board) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== "  " && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }
  // Cols
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== "  " && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  // Diagonally
  if (board[0][0] !== "  " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] !== "  " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  return null;
}

function isBoardFull(board) {
  for (let index = 0; index < 3; index++) {
    for (let innnerIndex = 0; innnerIndex < 3; innnerIndex++) {
      if (board[index][innnerIndex] === "  ") {
        return false;
      }
    }
  }
  return true;
}

function emptyCells(board) {
  const empty = [];
  for (let index = 0; index < 3; index++) {
    for (let innnerIndex = 0; innnerIndex < 3; innnerIndex++) {
      if (board[index][innnerIndex] === "  ") {
        empty.push([index, innnerIndex]);
      }
    }
  }
  return empty;
}

function botChance(board, bot, player) {
  const empty = emptyCells(board);
  console.log(empty);
  //win
  for (let index = 0; index < empty.length; index++) {
    const emptyIndex = empty[index][0];
    const emptyInnerIndex = empty[index][1];
    board[emptyIndex][emptyInnerIndex] = bot;
    if (checkWinner(board) === bot) {
      return;
    }
    board[emptyIndex][emptyInnerIndex] = "  ";
  }

  //block
  for (let index = 0; index < empty.length; index++) {
    const emptyIndex = empty[index][0];
    const emptyInnerIndex = empty[index][1];
    board[emptyIndex][emptyInnerIndex] = player;
    if (checkWinner(board) === player) {
      board[emptyIndex][emptyInnerIndex] = bot;
      return;
    }
    board[emptyIndex][emptyInnerIndex] = "  ";
  }

  if (board[1][1] === "  ") {
    board[1][1] = bot;
    return;
  }

  let corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
  for (let index = 0; index < corners.length; index++) {
    const cornerIndex = corners[index][0];
    const cornerInnerIndex = corners[index][1];
    if (board[cornerIndex][cornerInnerIndex] === "  ") {
      board[cornerIndex][cornerInnerIndex] = bot;
      return;
    }
  }
}

function play(board, player, bot, winner) {
  while (!isBoardFull(board) && winner === null) {
    console.log("player: ", player);
    const row = parseInt(prompt("enter row"));
    const coloumn = parseInt(prompt("enter coloumn"));

    if (isNaN(row) || isNaN(coloumn) || row < 0 || row > 2 || coloumn < 0 || coloumn > 2) {
      console.log("Invalid input! Please enter numbers between 0 and 2");
      continue;
    }

    if (board[row][coloumn] !== "  ") {
      console.log("⚠️ ENTERED PLACE IS ALREADY TAKEN");
      continue;
    }

    board[row][coloumn] = player;
    console.clear();
    printBoard(board);

    winner = checkWinner(board);
    if (winner) {
      break;
    }

    botChance(board, bot, player);
    console.clear();
    printBoard(board);

    winner = checkWinner(board);
    if (winner) {
      break;
    }
  }

  if (winner) {
    console.log("Player " + winner + " wins! 🎉");
  } else {
    console.log("It's a draw!");
  }
}

function start() {
  let board = [
    ['  ', '  ', '  '],
    ['  ', '  ', '  '],
    ['  ', '  ', '  ']
  ];
  printBoard(board);
  let player = "❌";
  let bot = "🅾️";
  let winner = null;
  play(board, player, bot, winner);
}

start();
