import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

let alarmState = []
let timeForAlarmBeingSet = ""
let currentAlarmTime = "14:54";
let previousAlarmTime = "";
let alarmDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let alarmVibrationTimeout;

export function alarmBoot(mainSlime){

  snoozeMode();

}

function snoozeMode(){

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
