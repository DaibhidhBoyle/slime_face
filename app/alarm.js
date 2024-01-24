import document from "document";
import * as mood from './mood.js'
import * as helper from './helper.js'

let alarmState = []
let alarmButtons = []
let alarmTime = "19:43";
let alarmDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export function alarmBoot(){
  let alarmGroup = document.getElementById("alarmGroup");
  alarmState = [...alarmGroup.children];
}

export function alarmByTick(currentTime, currentDay) {
  console.log(currentDay);
  console.log(currentTime);
  if (alarmDays.indexOf(currentDay) !== -1) {
    console.log("flag1");
    if (currentTime === alarmTime.substring(0, 5)) {
      console.log("flag2");
      switchAlarmState();
    }
  }
}

export function setComparisionStandards(standards) {
  alarmTime = standards.time;
  alarmDays = standards.days;
}

function switchAlarmState(){
  console.log("flag3" + " " + alarmState[0]);
  alarmState.forEach(
    alarmElement => {
      alarmElement.style.visibility = helper.toggleVisibilty(alarmElement)
    }
  );
};
