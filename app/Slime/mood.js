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
//----
//main body



export function moodBoot(slime) {
  moodSlime = slime
}

export function makeHappy(time){

  if(moodSlime.image === `images/slimes/${currentColor}/sleepSlime_1.png`){
  }
  else {

    moodSlime.image  = `images/slimes/${currentColor}/mainSlime_1.png`

    if (timeTillSad){
      clearTimeout(timeTillSad);
    }

    timeTillSad = setTimeout(() => makeSad(), time);
  }
}

export function makeSad(){

  vibration.start("nudge-max");

  clearInterval(slimeCheckInterval);

  slimeCheckInterval = setInterval(slimeCheckIn, 5 * 60 * 1000);

  moodSlime.image  = `images/slimes/${currentColor}/sadSlime_1.png`
}

function slimeCheckIn(){

  if(moodSlime.image  === `images/slimes/${currentColor}/sadSlime_1.png`){
    vibration.start("nudge");
  }

}
