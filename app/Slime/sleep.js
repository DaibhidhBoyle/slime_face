//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { eventListenersHandler, eventListenerRemoved, eventListenerSetup } from '../Helper/helper.js';
import { sleepBubble as sleepBubbleElement, animateDisplayElements as animateSleepElements, tumblerDelete } from '../Helper/components.js';
//----
//system imports
import { BodyPresenceSensor } from "body-presence";
//----
//local file imports
//----
//external file imports
import { fadeElement, widgetAnimation } from '../Display/animations.js';
//----
//----

//---EXPORTS---
//variables
export let bodyPresence;
export let sleepBubble;
export let buttonsAndCallbacksWithoutSleep;
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body


export function sleepBoot(slime, sleepSlime, allButtonsAndCallbacks) {

  buttonsAndCallbacksWithoutSleep = allButtonsAndCallbacks.filter(buttonsAndCallback => buttonsAndCallback.button !== sleepSlime)

  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, sleepBubbleElement, animateSleepElements);
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
  fadeElement(animateSleepElements, 1, 0);
  widgetAnimation(sleepBubble);
  eventListenersHandler(buttonsAndCallbacksWithoutSleep, eventListenerRemoved);

}

export function wakeMode(slime, sleepSlime, sleepBubble, animateSleepElements) {

  if (slime.style.visibility !== "visible"){
    sleepBubble.style.visibility = "hidden"
    sleepSlime.style.visibility = "hidden"
    if (tumblerDelete.style.visibility !== "visible"){
      slime.style.visibility = "visible"
    }
    fadeElement(animateSleepElements, 0, 1);
    sleepBubble.animate("disable");
  }
  eventListenersHandler(buttonsAndCallbacksWithoutSleep, eventListenerSetup);

}
