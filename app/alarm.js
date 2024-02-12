import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as helper from './helper.js'

let alarmState = []
let currentAlarmTime = "14:54";
let previousAlarmTime = "";
let alarmDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let alarmVibrationTimeout;

export function alarmBoot(){

  let tumblerHour = document.getElementById("tumbler-hour");
  let tumblerMin = document.getElementById("tumbler-mins");

  setUpTumblerStyle(tumblerHour, "hour-item", 23);
  setUpTumblerStyle(tumblerMin, "min-item", 59);

  let alarmGroup = document.getElementById("snoozeGroup");
  alarmState = [...alarmGroup.children];
  let plusButton = document.getElementById("plusButton");
  let minusButton = document.getElementById("minusButton");

  let plusButtonClick = () => {
    mood.makeHappy(5 * 60 * 1000);
    switchAlarmState();
    //turn off buzz
  };

  let minusButtonClick = () => {
    mood.makeSad();
    switchAlarmState();
    //turn off buzz
  };

  helper.eventListenerSetup(plusButton, plusButtonClick)
  helper.eventListenerSetup(minusButton, minusButtonClick)

}

function setUpTumblerStyle(tumbler, itemidprefix, NumberOfTumblerItems){

  for (let i = 0; i <= NumberOfTumblerItems; i++){
    let item = tumbler.getElementById(itemidprefix + i)

    let itemTextContainer = item.getElementById("text");

    let paddedNumberForTumbler = helper.zeroPad(`${i}`, 2);

    itemTextContainer.text = paddedNumberForTumbler
    itemTextContainer.style.fontFamily = "Tungsten-Medium"
    itemTextContainer.style.fontSize = 150
    itemTextContainer.style["fill"] = "#f887bd";

  }

}


// function setUpTumbler(itemArray) {
//   let i = 0
//
//   itemArray.forEach(item => {
//
//   let paddedNumberForTumbler = helper.zeroPad(i, 2);
//
//   item.style["text-buffer"] = paddedNumberForTumbler;
//   item.style["font-family"] = "Tungsten-Medium";
//   item.style["font-size"] = "150";
//   item.style["letter-length"] = "2";
//   item.style["letter-spacing"] = "3";
//   });
// }

export function alarmByTick(currentTime, currentDay) {
  if (alarmDays.indexOf(currentDay) !== -1) {
    if (currentTime === currentAlarmTime && currentAlarmTime !== previousAlarmTime){
      switchAlarmState();
      previousAlarmTime = currentAlarmTime;
      //constant buzz//
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
};

function startVibrationAlert() {

  function performVibration() {
    vibration.start("alert");
  }

  function scheduleVibration() {
    vibrationTimeout = setTimeout(performVibration, 1000);
  }

  function startLoop() {
    performVibration();
    scheduleVibration();
  }

  startLoop();
}
