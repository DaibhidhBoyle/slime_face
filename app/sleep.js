import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

let bodyPresence;
let buttons2;
let elements;

export function sleepBoot(buttons, toggableHTMLElements) {
  buttons2 = [...buttons]
  elements = [...toggableHTMLElements]
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = checkBodyPresence
    bodyPresence.start();
  } else {
    console.log("No body sensor. No alteration to display.");
  }
}

function checkBodyPresence() {
  let sleepSlime = document.getElementById("sleeping");
  let sleepBubble = document.getElementById("zzz");
  if (bodyPresence && bodyPresence.present) {
    wakeMode(sleepSlime, sleepBubble, buttons2, elements);
  } else {
    sleepMode(sleepSlime, sleepBubble, buttons2, elements);
  }
}


function sleepMode(sleepSlime, sleepBubble, buttons, toggableHTMLElements) {

  sleepSlime.style.visibility = "visible";
  buttons.forEach(button => {
   button.style.visibility = "hidden";
  });
  toggableHTMLElements.forEach(element => {
   element.style.visibility = "hidden";
  });
  animate.widgetAnimation(sleepBubble);
}

function wakeMode(sleepSlime, sleepBubble, buttons, toggableHTMLElements) {
  sleepSlime.style.visibility = "hidden";
  buttons.forEach(button => {
   button.style.visibility = "visible";
  });
  let dateAndTime = toggableHTMLElements.filter(element => element.id === "timeLabel" || element.id ==="dateLabel");
  dateAndTime.forEach(element => {
   element.style.visibility = "visible";
  });
  sleepBubble.style.visibility = helper.toggleVisibilty(sleepBubble);
  sleepBubble.animate("disable");
}
