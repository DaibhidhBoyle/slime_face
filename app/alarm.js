import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

let alarmState = []
let currentAlarmTime = "";
let previousTime = "";
export let alarms = [];

let alarmVibrationTimeout;

export function alarmBoot(mainSlime) {
  snoozeMode();
}

function snoozeMode() {
  let alarmGroup = document.getElementById("snoozeGroup");
  alarmState = [...alarmGroup.children];
  let plusButton = document.getElementById("plusButton");
  let minusButton = document.getElementById("minusButton");

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

  helper.eventListenerSetup(plusButton, plusButtonClick);
  helper.eventListenerSetup(minusButton, minusButtonClick);
}

export function alarmByTick(currentTime, currentDay) {

  for (let i = 0; i < alarms.length; i++) {
    let alarm = alarms[i];
    if (alarm.time === currentTime && alarm.days.indexOf(currentDay) !== -1 && currentTime !== previousTime) {
      switchAlarmState();
      previousTime = currentTime;
      startVibrationAlert();
      break; // Stop searching once we've found a matching alarm
    }
  }
}

export function setNewAlarm(newAlarm) {
    alarms.push(newAlarm);
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


export function populateDeleteAlarmTumbler(tumblerElement){

  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++){
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i)

    let itemTextContainer = item.getElementById("text");

    if (alarms[i] !== undefined && alarms[i] !== undefined){

      let dayIntitals = StringifyDaysInitials(alarms[i].days)
      console.log(dayIntitals);
      let alarmText = alarms[i].time.concat("   ", dayIntitals)
      itemTextContainer.style.fontSize = 50

    } else {
      let alarmText = "No Alarm Set"
    }

    itemTextContainer.text = alarmText



  }

}

function StringifyDaysInitials(days) {
  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']; // Full names of each day

    let result = '';
    for (let i = 0; i < daysOfWeek.length; i++) {
        if (days.indexOf(daysOfWeek[i]) !== -1) {
            result += daysOfWeek[i][0] + ' '; // Add first letter if present in the array
        } else {
            result += '. '; // Add a blank space if not present
        }
    }
    return result
}
