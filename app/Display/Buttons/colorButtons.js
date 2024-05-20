//---IMPORTS---
//document
//----
//helper imports
import * as components from '../../Helper/components.js'
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

let colors = ["Green", "Pink", "White", "Yellow", "Orange", "Red", "Blue", "Purple"]

export function colorButton(mainSlime, direction){

  currentColor = "Green"

  let colorSwitchElements = [components.mainSlime, components.sleepSlime, components.eat, ...components.jumpFramesUnaltered, ...components.fishFramesUnaltered]

  let colorClick = () => {
    handleColorButtonClick(
      mainSlime,
      colorSwitchElements,
      direction
    )
  }

  let colorButtonData = [];

  let targetColorButtons = direction === "left" ? components.leftColorButtons : components.rightColorButtons;

  targetColorButtons.forEach((colorButton) => {
    colorButtonData.push({ button: colorButton, callback: colorClick });
  });

  return colorButtonData

}

function handleColorButtonClick(mainSlime, colorSwitchElements, direction) {

  let position = colors.indexOf(currentColor);

  if (position !== -1) {
    if (direction === "left") {
      let newColor =  colors[(position - 1 + colors.length) % colors.length];

      colorSwitchElements.forEach((element) => {
        element.image.replace(currentColor, newColor);
      });

      changeColor(newColor, currentColor, colorSwitchElements)

      currentColor = newColor;

      console.log(currentColor);
    } else if (direction === "right") {
      let newColor = colors[(position + 1) % colors.length];

      colorSwitchElements.forEach((element) => {
        element.image.replace(currentColor, newColor);
      });


      changeColor(newColor, currentColor, colorSwitchElements)


      currentColor = newColor;

      console.log(currentColor);
    }
  }
}

function changeColor(newColor, currentColor, colorSwitchElements){

  colorSwitchElements.forEach((element) => {
    let colorChangeRegex = new RegExp(currentColor, "g");
    element.image = element.image.replace(colorChangeRegex, newColor);
  });

}
