//---IMPORTS---
//document
//----
import document from "document";
//----
//helper imports
import * as components from '../Helper/components.js'
import * as helper from '../Helper/helper.js'
//----
//system imports
//----
import { vibration } from "haptics";
//----
//local file imports
//----
//external file imports
//----
import * as mood from '../Slime/mood.js'
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
let alarmState = []
let currentAlarmTime = "";
let previousTime = "";
//-
let alarmVibrationTimeout;
//----
//main body

export function alarmSnoozeBoot(mainSlime) {
    let plusButtonClick = () => {
      mood.makeHappy(5 * 60 * 1000);
      switchAlarmState();
      stopVibrationAlert();
    };

    let minusButtonClick = () => {
      mood.makeSad();
      switchAlarmState();
      stopVibrationAlert();
    };

    helper.eventListenerSetup(components.plusButton, plusButtonClick);
    helper.eventListenerSetup(components.minusButton, minusButtonClick);
}

export function setNewAlarm(newAlarm) {
  components.alarms.push(newAlarm);
}

export function alarmByTick(currentTime, currentDay) {

  for (let i = 0; i < components.alarms.length; i++) {
    let alarm = components.alarms[i];
    if (alarm.time === currentTime && alarm.days.indexOf(currentDay) !== -1 && currentTime !== previousTime) {
      switchAlarmState();
      previousTime = currentTime;
      startVibrationAlert();
      break; // Stop searching once we've found a matching alarm
    }
  }
}



function switchAlarmState() {
  alarmState.forEach(alarmElement => {
    alarmElement.style.visibility = helper.toggleVisibilty(alarmElement);
  });
}

function startVibrationAlert() {
  function performVibration() {
    vibration.start("alert");
  }

  function scheduleVibration() {
    alarmVibrationTimeout = setTimeout(performVibration, 1000);
  }

  function startLoop() {
    performVibration();
    scheduleVibration();
  }

  startLoop();
}

function stopVibrationAlert() {
  clearTimeout(alarmVibrationTimeout);
}
