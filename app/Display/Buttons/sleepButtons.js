//---IMPORTS---
//document
//----
//helper imports
import { sleepBubble, animateDisplayElements } from '../../Helper/components.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { wakeMode, sleepMode, bodyPresence } from '../../Slime/sleep.js';
//----
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

export function sleepButton(mainSlime, sleepSlime) {
  return { button: sleepSlime, callback: () => handleSleepButtonClick(mainSlime, sleepSlime) };
}

function handleSleepButtonClick(mainSlime, sleepSlime) {
  wakeMode(mainSlime, sleepSlime, sleepBubble, animateDisplayElements);
  setTimeout(() => {
    if (bodyPresence && !bodyPresence.present) {
      sleepMode(mainSlime, sleepSlime, sleepBubble, animateDisplayElements);
    }
  }, 60 * 1000);
}
