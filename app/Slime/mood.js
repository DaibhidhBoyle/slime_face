//---IMPORTS---
//document
import document from "document";
//----
//helper imports
//----
//system imports
import { vibration } from "haptics";
//----
//local file imports
//----
//external file imports
import { currentColor } from '../Display/Buttons/colorButtons.js';
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
let moodSlime;
let timeTillSad;
let slimeCheckInterval;
//-
let slimeImagePath = `images/slimes/${currentColor}/`;
//----
//main body



export function moodBoot(slime) {
  moodSlime = slime
}

export function makeHappy(time){

  if (moodSlime.image !== `${slimeImagePath}sleepSlime_1.png`) {
   moodSlime.image = `${slimeImagePath}mainSlime_1.png`;
   resetTimeout(time, makeSad);
 }
}

export function makeSad(){

  vibration.start("nudge-max");
  clearInterval(slimeCheckInterval);
  moodSlime.image = `${slimeImagePath}sadSlime_1.png`;
  slimeCheckInterval = setInterval(slimeCheckIn, 5 * 60 * 1000);
}

function resetTimeout(time, callback) {
  if (timeTillSad) {
    clearTimeout(timeTillSad);
  }
  timeTillSad = setTimeout(callback, time);
}

function slimeCheckIn(){

  if (moodSlime.image === `${slimeImagePath}sadSlime_1.png`) {
   vibration.start("nudge");
 }

}
