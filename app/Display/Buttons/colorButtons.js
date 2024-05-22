//---IMPORTS---
//document
//----
//helper imports
import { mainSlime, sleepSlime, eat, jumpFramesUnaltered, fishFramesUnaltered, leftColorButtons, rightColorButtons } from '../../Helper/components.js';
//----
//system imports
//----
//local file imports
//----
//external file imports
//----
//----

//---EXPORTS---
//variables
export let currentColor;
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

let colors = ["Green", "Pink", "White", "Yellow", "Orange", "Red", "Blue", "Purple"];

export function colorButton(mainSlime, direction) {
  currentColor = "Green";

  let colorSwitchElements = [mainSlime, sleepSlime, eat, ...jumpFramesUnaltered, ...fishFramesUnaltered];

  let colorClick = () => {
    handleColorButtonClick(mainSlime, colorSwitchElements, direction);
  };

  let colorButtonData = [];
  let targetColorButtons = direction === "left" ? leftColorButtons : rightColorButtons;

  targetColorButtons.forEach((colorButton) => {
    colorButtonData.push({ button: colorButton, callback: colorClick });
  });

  return colorButtonData;
}

function handleColorButtonClick(mainSlime, colorSwitchElements, direction) {
  let position = colors.indexOf(currentColor);

  if (position !== -1) {
    let newPosition = calculateNewPosition(position, direction);

    let newColor = colors[newPosition];

    colorSwitchElements.forEach((element) => {
      replaceColor(element, currentColor, newColor);
    });

    changeColor(currentColor, newColor, colorSwitchElements);
    currentColor = newColor;
  }
}

function calculateNewPosition(position, direction) {
  if (direction === "left") {
    return (position - 1 + colors.length) % colors.length;
  } else if (direction === "right") {
    return (position + 1) % colors.length;
  }
}

function replaceColor(element, oldColor, newColor) {
  let colorChangeRegex = new RegExp(oldColor, "g");
  element.image = element.image.replace(colorChangeRegex, newColor);
}

function changeColor(oldColor, newColor, colorSwitchElements) {
  colorSwitchElements.forEach((element) => {
    replaceColor(element, oldColor, newColor);
  });
}
