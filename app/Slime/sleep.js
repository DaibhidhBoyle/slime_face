//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import * as components from '../Helper/components.js'
import * as helper from '../Helper/helper.js';
//----
//system imports
import { BodyPresenceSensor } from "body-presence";
//----
//local file imports
//----
//external file imports
import * as animate from '../Display/animations.js'
//----
//----

//---EXPORTS---
//variables
export let bodyPresence;
export let sleepBubble;
export let animateSleepElements;
export let buttonsAndCallbacksWithoutSleep
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body


export function sleepBoot(slime, sleepSlime, allButtonsAndCallbacks) {


  // animateSleepCorners = document.getElementById("fadeCornerButtons");
  buttonsAndCallbacksWithoutSleep = allButtonsAndCallbacks.filter(buttonsAndCallback => buttonsAndCallback.button !== sleepSlime)

  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, components.sleepBubble, components.animateDisplayElements);
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
    if (components.tumblerDelete.style.visibility !== "visible"){
      slime.style.visibility = "visible"
    }
    animate.fadeElement(animateSleepElements, 0, 1);
    sleepBubble.animate("disable");
  }
  helper.eventListenersHandler(buttonsAndCallbacksWithoutSleep, helper.eventListenerSetup);

}
