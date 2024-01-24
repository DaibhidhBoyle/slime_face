import document from "document";
import * as mood from './mood.js'

let alarmButtons = ""
let alarmTime = "";
let alarmDays = [];

export function alarmBoot(){

}

export function alarmByTick(currentTime, currentDay) {
  if (alarmDays.indexOf(currentDay) !== -1) {
    if (currentTime === alarmTime.substring(0, 5)) {
      
    }
  }
}

export function setComparisionStandards(standards) {
  alarmTime = standards.time;
  alarmDays = standards.days;
}
