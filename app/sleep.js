import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

export let bodyPresence;
export let sleepBubble;
export let animatedSleepElements;

export function sleepBoot(slime) {
  sleepBubble = document.getElementById("zzz");
  animatedSleepElements = document.getElementsByClassName("animateSleepElement");
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepBubble, animatedSleepElements)
    bodyPresence.start();
  } else {
    console.log("No body sensor.");
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


export function sleepMode(slime, sleepBubble, animatedSleepElements) {

  fadeSleepElement(animatedSleepElements, 1, 0);
  animate.widgetAnimation(sleepBubble);
  slime.image = "images/slimes/sleepSlime_1.png"

}

export function wakeMode(slime, sleepBubble, animatedSleepElements) {

  fadeSleepElement(animatedSleepElements, 0, 1);
  sleepBubble.style.visibility = "hidden"
  sleepBubble.animate("disable");

  slime.image = "images/slimes/mainSlime_1.png"
}

function fadeSleepElement(elements, from, to){
  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });
}
