import document from "document";
import * as animate from './animations.js'
import * as helper from './helper.js';
import { BodyPresenceSensor } from "body-presence";

export let bodyPresence;
export let sleepBubble;
export let animatedSleepElements;
export let buttonsAndCallbacksWithoutSleep

export function sleepBoot(slime, sleepSlime, allButtonsAndCallbacks) {

  sleepBubble = document.getElementById("zzz");
  let animateSleepElements = document.getElementsByClassName("fadeDisplayElements");
  buttonsAndCallbacksWithoutSleep = allButtonsAndCallbacks.filter(buttonsAndCallback => buttonsAndCallback.button !== sleepSlime)

  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, sleepBubble, animateSleepElements);
    bodyPresence.start();
  } else {
    console.log("No body sensor.");
  }

}

function checkBodyPresence(slime, sleepSlime, sleepBubble, animateSleepElements) {

  if (bodyPresence && bodyPresence.present) {
    wakeMode(slime, sleepSlime, sleepBubble, animateSleepElements);
  } else {
    sleepMode(slime, sleepSlime, sleepBubble, animateSleepElements);
  }

}


export function sleepMode(slime, sleepSlime, sleepBubble, animateSleepElements) {

  sleepSlime.style.visibility = "visible"
  slime.style.visibility = "hidden"
  animate.fadeElement(animateSleepElements, 1, 0);
  animate.widgetAnimation(sleepBubble);
  helper.eventListenersHandler(buttonsAndCallbacksWithoutSleep, helper.eventListenerRemoved);

}

export function wakeMode(slime, sleepSlime, sleepBubble, animateSleepElements) {

  if (slime.style.visibility !== "visible"){
    sleepBubble.style.visibility = "hidden"
    sleepSlime.style.visibility = "hidden"
    slime.style.visibility = "visible"
    animate.fadeElement(animateSleepElements, 0, 1);
    sleepBubble.animate("disable");
  }
  helper.eventListenersHandler(buttonsAndCallbacksWithoutSleep, helper.eventListenerSetup);

}
