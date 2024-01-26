import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as helper from './helper.js'

let alarmState = []
let currentAlarmTime = "14:54";
let previousAlarmTime = "";
let alarmDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export function alarmBoot(){
  let alarmGroup = document.getElementById("alarmGroup");
  alarmState = [...alarmGroup.children];
  let plusButton = document.getElementById("plusButton");
  let minusButton = document.getElementById("minusButton");

  let plusButtonClick = () => {
    mood.makeHappy(5 * 60 * 1000);
    switchAlarmState();
  };

  let minusButtonClick = () => {
      mood.makeSad();
      switchAlarmState();
  };

  helper.eventListenerSetup(plusButton, plusButtonClick)
  helper.eventListenerSetup(minusButton, minusButtonClick)
}

export function alarmByTick(currentTime, currentDay) {
  if (alarmDays.indexOf(currentDay) !== -1) {
    if (currentTime === currentAlarmTime && currentAlarmTime !== previousAlarmTime){
      switchAlarmState();
      previousAlarmTime = currentAlarmTime;
    }
  }
}

export function setComparisionStandards(standards) {
  alarmTime = standards.time.substring(0, 5);
  alarmDays = standards.days;
}

function switchAlarmState(){
  alarmState.forEach(
    alarmElement => {
      alarmElement.style.visibility = helper.toggleVisibilty(alarmElement)
    }
  );
  vibration.start("alert");
};
