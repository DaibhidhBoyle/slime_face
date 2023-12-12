import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

let bodyPresence;

export function sleepBoot(slime) {
  let sleepBubble = document.getElementById("zzz");
  let animatedSleepElements = document.getElementsByClassName("animateSleepElement");
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepBubble, animatedSleepElements)
    bodyPresence.start();
  } else {
    console.log("No body sensor. No alteration to display.");
  }
}

function checkBodyPresence(slime, sleepBubble, animatedSleepElements) {

  if (bodyPresence && bodyPresence.present) {
    wakeMode(slime, sleepBubble, animatedSleepElements);
    console.log("wake");
  } else {
    sleepMode(slime, sleepBubble, animatedSleepElements);
    console.log("sleep");
  }
}


function sleepMode(slime, sleepBubble, animatedSleepElements) {

  slime.image = "images/slimes/sleepSlime_1.png"
  fadeSleepElement(animatedSleepElements, 1, 0);
  animate.widgetAnimation(sleepBubble);
}

function wakeMode(slime, sleepBubble, animatedSleepElements) {
  slime.image = "images/slimes/mainSlime_1.png"
  fadeSleepElement(animatedSleepElements, 0, 1);
  sleepBubble.style.visibility = "hidden"
  sleepBubble.animate("disable");
}

function fadeSleepElement(elements, from, to){
  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });
}
