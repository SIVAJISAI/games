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
  for (let index = 0; index < 3; index++) {
    if (board[index][0] !== "  " && board[index][0] === board[index][1] && board[index][1] === board[index][2]) {
      return board[index][0];
    }
  }
  // Cols
  for (let index = 0; index < 3; index++) {
    if (board[0][index] !== "  " && board[0][index] === board[1][index] && board[1][index] === board[2][index]) {
      return board[0][index];
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

function validInput(board) {
  let row = checkValide("row");
  let coloumn = checkValide("coloumn");
  if (board[row][coloumn] !== "  ") {
    console.log("⚠️ ENTERED PLACE IS ALREADY TAKEN");
    return validInput(board);
  }
  return [row, coloumn];
}

function checkValide(text) {
  let isInvalideRow = true;
  let input = 0;
  while (isInvalideRow) {
    input = parseInt(prompt(`enter  valid ${text}:`));
    isInvalideRow = (isNaN(input) || input < 0 || input > 2);
  }
  return input;
}

function play(board, player, bot, winner) {
  while (!isBoardFull(board) && !winner) {
    console.log("player: ", player);
    const userInputs = validInput(board);
    const row = userInputs[0];
    const coloumn = userInputs[1];
    board[row][coloumn] = player;
    console.clear();
    printBoard(board);

    winner = checkWinner(board);
    if (!winner) {
      botChance(board, bot, player);
      console.clear();
      printBoard(board);
      winner = checkWinner(board);
    }
  }

  console.log(printWinner(winner));
}

function printWinner(winner) {
  if (winner) {
    return ("Player " + winner + " wins! 🎉");
  }
  return "it is draw!";
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
  let winner = false;
  play(board, player, bot, winner);
}

start();
