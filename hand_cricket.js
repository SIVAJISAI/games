let userScore = 0;
let compScore = 0;
function isValidRun(run) {
  if (isNaN(run) || run < 1 || run > 6) {
    console.log("\t🤦🏻‍♂️ ENTER NUMBER BETWEEN 1–6");
    return false;
  }
  return true;
}
function outOrNotOut(run) {
  if (!isValidRun(run)) {
    return true;
  }
  const generatedRun = Math.floor(Math.random() * 6 + 1);
  if (run === generatedRun) {
    console.log("\tOUT ☝️");
    return false;
  }
  userScore += run;
  return true;
}

function firstBat(target = null) {
  console.log("\nYOU ARE NOW BATTING 🏏\n");
  let stillBatting = true;

  while (stillBatting) {
    const run = parseInt(prompt("enter your run [1-6]"));
    stillBatting = outOrNotOut(run);

    if (target !== null && userScore > target) {
      console.log("YOU CHASED THE SCORE SUCCESSFULLY 🎯");
      stillBatting = false;
    }
    console.log("current score",userScore);
  }
  console.log("final score", userScore);
}

function isOut(run) {
  if (!isValidRun(run)) {
    return true;
  }
  
  const generatedRun = Math.floor(Math.random() * 6 + 1);
  if (run === generatedRun) {
    console.log("\tOUT ☝️! \n🤖's final score:", compScore);
    return false;
  }
  compScore += generatedRun;
  console.log("\t🤖's score", compScore);
  return true;
}

function firstBowl(target = null) {
  console.log("\nYOU ARE NOW BOWLING ☄️");
  let isNotOut = true;

  while (isNotOut) {
    const run = parseInt(prompt("bowl a number"));
    isNotOut = isOut(run, target);
    if (target !== null && compScore > target) {
      console.log("🤖 CHASED THE TARGET SUCCESSFULLY 🎯");
      isNotOut = false;
    }
  }
}

function decideWinner(userScore, compScore) {
  console.log("\nYOUR SCORE:", userScore);
  console.log("🤖 SCORE:", compScore);

  if (compScore === userScore) {
    console.log("\nMATCH DRAW 🤝");
  }
  else if (compScore > userScore) {
    console.log("\nYOU LOST 😞");
  } else {
    console.log("\nYOU WON 🎉");
  }
}

function toss() {
  const choice = prompt("choose Bat or Bowl:").toLowerCase();
  console.log("you've choosen", choice);
  const toss = ["bat", "bowl"];
  const actualToss = toss[Math.floor(Math.random() * 2)];
  console.log("\ntoss result ===", actualToss);
  const result = choice === actualToss ? choice : actualToss;

  if (result === "bat") {
    firstBat();
    console.log("🤖 WILL NOW CHASE YOUR SCORE");
    firstBowl(userScore);
  } else {
    firstBowl();
    console.log("YOU HAVE TO CHASE 🤖's SCORE NOW");
    firstBat(compScore);
  }
  decideWinner(userScore, compScore);
}

function play() {
  toss();
}
play();
