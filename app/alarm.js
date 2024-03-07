import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

let alarmState = []
let timeForAlarmBeingSet = ""
let currentAlarmTime = "";
let previousTime = "";
let alarms = []
let alarmTimes = [];
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

    if (alarmTimes.indexOf(currentTime) !== -1 && currentTime !== previousTime){

      let indexOfTime = alarmTimes.indexOf(currentTime)

      if(alarms[indexOfTime][currentTime].indexOf(currentDay) !== -1){

        switchAlarmState()
        previousTime = currentTime;
        //constant buzz//
      }
    }

}

export function setNewAlarm(newAlarm) {



  alarmTimes = []

  alarms.push(newAlarm)

  console.log(alarms.length);

  for (let obj of alarms) {
    let keys = Object.keys(obj);
    alarmTimes = alarmTimes.concat(keys);
  }

  console.log("NEW ALARM" + " " + newAlarm[alarmTimes[0]]);

  console.log(alarmTimes);

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
