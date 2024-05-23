//---IMPORTS---
//document
import document from "document";
//----
//helper imports
//----
//system imports
//----
//local file imports
//----
//external file imports
import { alarmBoot } from './Alarm/alarm.js';
import { buttonsBoot } from './Display/Buttons/buttons.js';
import { infomaticsBoot } from './Display/Infomatics/infoBoot.js';
import { moodBoot } from './Slime/mood.js';
import { sleepBoot } from './Slime/sleep.js';
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


boot();

function boot(){

  infomaticsBoot();
  let allButtons = buttonsBoot();
  alarmBoot(allButtons.main);
  moodBoot(allButtons.main);
  sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);

}
