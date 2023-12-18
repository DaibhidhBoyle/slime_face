import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

export let bodyPresence;
export let sleepBubble;
export let animatedSleepElements;

export function sleepBoot(slime, sleepSlime) {
  
  sleepBubble = document.getElementById("zzz");
  animatedSleepElements = document.getElementsByClassName("animateSleepElement");
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, sleepBubble, animatedSleepElements);
    bodyPresence.start();
  } else {
    console.log("No body sensor.");
  }

}

function checkBodyPresence(slime, sleepSlime, sleepBubble, animatedSleepElements) {

  if (bodyPresence && bodyPresence.present) {
    wakeMode(slime, sleepSlime, sleepBubble, animatedSleepElements);
    console.log("wake");
  } else {
    sleepMode(slime, sleepSlime, sleepBubble, animatedSleepElements);
    console.log("sleep");
  }

}


export function sleepMode(slime, sleepSlime, sleepBubble, animatedSleepElements) {

  sleepSlime.style.visibility = "visible"
  slime.style.visibility = "hidden"
  fadeSleepElement(animatedSleepElements, 1, 0);
  animate.widgetAnimation(sleepBubble);

}

export function wakeMode(slime, sleepSlime, sleepBubble, animatedSleepElements) {

  sleepBubble.style.visibility = "hidden"
  sleepSlime.style.visibility = "hidden"
  slime.style.visibility = "visible"
  fadeSleepElement(animatedSleepElements, 0, 1);
  sleepBubble.animate("disable");


}

function fadeSleepElement(elements, from, to){

  console.trace();
  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });

}
