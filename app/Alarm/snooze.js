//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { plusButton, minusButton, alarms, alarmState } from '../Helper/components.js';
import { eventListenerSetup, toggleManyVisibility } from '../Helper/helper.js';
//----
//system imports
import { vibration } from "haptics";
//----
//local file imports
//----
//external file imports
import { makeHappy, makeSad } from '../Slime/mood.js';
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
let currentAlarmTime = "";
let previousTime = "";
//-
let alarmVibrationTimeout;
//----
//main body

export function alarmSnoozeBoot(mainSlime) {

  eventListenerSetup(plusButton, () => handleSnoozeButtonClick(handleMakeHappy));
  eventListenerSetup(minusButton, () => handleSnoozeButtonClick(handleMakeSad));
}

function handleSnoozeButtonClick(callback) {
  callback();
  toggleManyVisibility(alarmState);
  stopVibrationAlert();
}

function handleMakeHappy(){
  makeHappy(5 * 60 * 1000);
}

function handleMakeSad(){
  makeSad();
}

export function setNewAlarm(newAlarm) {
  alarms.push(newAlarm);
}

export function alarmByTick(currentTime, currentDay) {
  for (let i = 0; i < alarms.length; i++) {
    let alarm = alarms[i];
    if (alarm.time === currentTime && alarm.days.indexOf(currentDay) !== -1 && currentTime !== previousTime) {
      toggleManyVisibility(alarmState)
      previousTime = currentTime;
      startVibrationAlert();
      break; // Stop searching once we've found a matching alarm
    }
  }
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
