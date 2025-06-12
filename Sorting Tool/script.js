function resizeInput(input) {
  const length = input.value.length || 1;
  let width = length + 2;
  if (length >= 8) {
    width = 10;
  }
  input.style.width = `${width}ch`;
}
function randArray() {
  let arrayLen = document.getElementById("arrayLength").value;
  let array = [];
  stopSorting = true;
  for (i = 0; i < arrayLen; i++) {
    array.push(Math.floor(Math.random() * (20 - 0) + 0));
  }
  globalArray = array;
  displayValues("");
  renderBars(array);
}
function renderBars(array) {
  const barContainer = document.getElementById("barContainer");
  barContainer.innerHTML = "";
  const maxVal = Math.max(...array);
  array.forEach(value => {
    //
    const barWrapper = document.createElement("div");
    barWrapper.className = "flexColumn barWrapper";
    //
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${(value / maxVal) * 100}%`;

    //
    const valueLabel = document.createElement("span");
    valueLabel.textContent = value;
    valueLabel.className = "valueLabel";
    //
    barWrapper.appendChild(bar);
    barWrapper.appendChild(valueLabel);
    barContainer.appendChild(barWrapper);
  });
}
function sortMethod() {
  let sortMethod = document.getElementById("sortMethod").value;
  stopSorting = true;
  switch (sortMethod) {
    case "bogo":
      bogoSort(globalArray);
      break;
    case "bubble":
      bubbleSort(globalArray);
      break;
    case "selection":
      selectionSort(globalArray);
      break;
  }
}
function displayValues(steps) {
  document.getElementById("numberSteps").innerHTML = steps;
}
function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] >= array[i - 1]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function bogoSort(array) {
  let shuffleCount = 0;
  stopSorting = false;
  while (isSorted(array) === false) {
    if (stopSorting) {
      return;
    }
    array = shuffleArray(array);
    shuffleCount++;
    renderBars(array);
    displayValues("Total shuffles: " + shuffleCount);
    await sleep(100);
  }
}
function shuffleArray(unshuffled) {
  let shuffled = unshuffled.map(item => item);
  for (i = unshuffled.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (unshuffled.length - 1));
    shuffled.splice(j, 1, unshuffled[i]);
    shuffled.splice(i, 1, unshuffled[j]);
    unshuffled = shuffled.map(item => item);
  }
  return shuffled;
}
async function bubbleSort(array) {
  let numberMoves = 0;
  stopSorting = false;

  for (let i = array.length; i > 1; i--) {
    for (let j = 1; j < array.length; j++) {
      if (stopSorting) {
        return;
      }
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        numberMoves++;
      }
      renderBars(array);
      displayValues("Total Swaps: " + numberMoves);
      await sleep(100);
    }
  }
}
async function selectionSort(array) {
  let numberMoves = 0;
  stopSorting = false;
  let sortedArray = [...array];
  let min = 0;
  for (let i = 0; i < sortedArray.length - 2; i++) {
    min = Math.min(...array);
    for (let j = 0; j < array.length; j++) {
      if (stopSorting) {
        return;
      }
      if (array[j] === min) {
        [sortedArray[i], sortedArray[j + i]] = [sortedArray[j + i], sortedArray[i]];
        array = [...sortedArray]
        array.splice(0, i + 1);
        numberMoves++;
        renderBars(sortedArray);
        displayValues("Total Swaps: " + numberMoves);
        await sleep(100);
        break;
      }
    }
  }
  return sortedArray;
}

var globalArray;
var stopSorting;
let userInput = document.getElementById("arrayLength");
resizeInput(userInput);