import document from "document";
import * as mood from './mood.js'

let alarmTime = "";
let alarmDays = [];

export function alarmBoot(currentTime, currentDay) {
  if (alarmDays.indexOf(currentDay) !== -1) {
    if (currentTime === alarmTime.substring(0, 5)) {
      console.log("works");
    }
  }
}

export function setComparisionStandards(standards) {
  alarmTime = standards.time;
  alarmDays = standards.days;
}
