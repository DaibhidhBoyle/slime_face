import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

let bodyPresence;

export function sleepBoot(buttons, toggableHTMLElements) {
  let buttons = [...buttons]
  let toggableHTMLElements = [...toggableHTMLElements]
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(buttons, toggableHTMLElements)
    bodyPresence.start();
  } else {
    console.log("No body sensor. No alteration to display.");
  }
}

function checkBodyPresence(buttons, elements) {
  let sleepSlime = document.getElementById("sleeping");
  let sleepBubble = document.getElementById("zzz");
  if (bodyPresence && bodyPresence.present) {
    wakeMode(sleepSlime, sleepBubble, buttons, elements);
    console.log("wake");
  } else {
    sleepMode(sleepSlime, sleepBubble, buttons, elements);
    console.log("sleep");
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
  sleepBubble.style.visibility = "hidden"
  sleepBubble.animate("disable");
}
