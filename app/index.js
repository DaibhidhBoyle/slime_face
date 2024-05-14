//---IMPORTS---
//document
//----
//helper imports
//----
//system imports
//----
//local file imports
//----
//external file imports
import * as alarm from './Alarm/alarm.js'
import * as setAlarm from './Alarm/setAlarm.js'
//-
import * as buttons from './Display/Buttons/buttons.js'
//-
import * as info from './Display/Infomatics/info.js'
//-
import * as mood from './Slime/mood.js'
import * as sleep from './Slime/sleep.js'
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

  info.infomaticsBoot();
  let allButtons = buttons.buttonsBoot();
  alarm.alarmBoot(allButtons.main);
  mood.moodBoot(allButtons.main);
  sleep.sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);

}
