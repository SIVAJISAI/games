function checkGlass(array, bridge) {
  let step = 0;
  while (step < array.length) {
    console.log(array);
    const choice = prompt(`step:${step + 1} choose L or R`).toUpperCase();
    const choiceIndex = choice === 'L' ? 0 : 1;
    if (isStrong(choiceIndex, step, array)) {
      console.clear();
      console.log("\n✅ safe proceed  with next step");
      printBridge(newBridge(step, choiceIndex, bridge));
      step++;
    } else {
      printBridge(brokenBridge(step, choiceIndex, bridge));
      console.log("\n💥 glass broke you fell");
      return;
    }
  }
  console.log(`you crossed the bridge safely🎉`);
}

function isStrong(choiceIndex, step, array) {
  return array[step][choiceIndex] === 1;
}

function newBridge(step, choiceIndex, bridge) {
  bridge[step][choiceIndex] = "🧍🏻‍♂️";
  return bridge;
}

function brokenBridge(step, choiceIndex, bridge) {
  bridge[step][choiceIndex] = "🤦🏻‍♂️";
  return bridge;
}

function printBridge(bridge) {
  for (let index = 0; index < bridge.length; index++) {
    console.log(bridge[index][0] + "\t" + bridge[index][1]);
  }
}

function play(bridge) {
  printBridge(bridge);
  let array = [];
  for (let index = 0; index < bridge.length; index++) {
    const first = Math.floor(Math.random() * 2);
    const second = first === 0 ? 1 : 0;
    array[index] = [first, second];
  }
  console.log("bridge generated let's play!")
  checkGlass(array, bridge);
}

function constructBridge(coloumns, rows) {
  let bridge = [];
  for (let row = 0; row < rows; row++) {
    bridge[row] = [];
    for (let col = 0; col < coloumns; col++) {
      bridge[row][col] = "-";
    }
  }
  return bridge;
}

function display() {
  const bridge = constructBridge(2, 5);
  play(bridge);
}

display();
