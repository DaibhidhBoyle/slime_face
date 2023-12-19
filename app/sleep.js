import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

export let bodyPresence;
export let sleepBubble;
export let animatedSleepElements;

export function sleepBoot(slime, sleepSlime, allButtonsAndCallbacks) {

  sleepBubble = document.getElementById("zzz");
  animatedSleepElements = document.getElementsByClassName("animateSleepElement");
  let buttonsAndCallbacksWithoutSleep = allButtonsAndCallbacks.filter(buttonsAndCallback => buttonsAndCallback.button !== sleepSlime)

  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep);
    bodyPresence.start();
  } else {
    console.log("No body sensor.");
  }

}

function checkBodyPresence(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep) {

  if (bodyPresence && bodyPresence.present) {
    wakeMode(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep);
  } else {
    sleepMode(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep);
  }

}


export function sleepMode(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep) {

  sleepSlime.style.visibility = "visible"
  slime.style.visibility = "hidden"
  fadeSleepElement(animatedSleepElements, 1, 0);
  animate.widgetAnimation(sleepBubble);
  helper.eventListenersHandler(buttonsAndCallbacksWithoutSleep, helper.eventListenerRemoved);

}

export function wakeMode(slime, sleepSlime, sleepBubble, animatedSleepElements, buttonsAndCallbacksWithoutSleep) {

  sleepBubble.style.visibility = "hidden"
  sleepSlime.style.visibility = "hidden"
  slime.style.visibility = "visible"
  fadeSleepElement(animatedSleepElements, 0, 1);
  sleepBubble.animate("disable");
  helper.eventListenersHandler(buttonsAndCallbacksWithoutSleep, helper.eventListenerSetup);

}

function fadeSleepElement(elements, from, to){

  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });

}
