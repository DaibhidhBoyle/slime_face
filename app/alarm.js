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

  let tumblerHour = document.getElementById("tumbler-hour");
  let tumblerMin = document.getElementById("tumbler-mins");
  let tumblerElements = {"hour": { "tumbler": tumblerHour, "itemIdPrefix": "hour-item", "numberOfItems": 23 }, "min": {"tumbler": tumblerMin, "itemIdPrefix": "min-item", "numberOfItems": 59}}

  setUpTumblerStyle(tumblerElements["hour"]);
  setUpTumblerStyle(tumblerElements["min"]);


  setAlarmMode(tumblerElements, mainSlime);

  snoozeMode();
}

function setUpTumblerStyle(tumblerElement){

  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++){
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i)

    let itemTextContainer = item.getElementById("text");

    let paddedNumberForTumbler = helper.zeroPad(`${i}`, 2);

    itemTextContainer.text = paddedNumberForTumbler
    itemTextContainer.style.fontFamily = "Tungsten-Medium"
    itemTextContainer.style.fontSize = 150
    itemTextContainer.style["fill"] = "#f887bd";

  }

}

function setAlarmMode(tumblerElements, mainSlime){

  let tumblers = Object.keys(tumblerElements).map(key => tumblerElements[key].tumbler);
  // grab elements
  let tumblerColon = document.getElementById("tumblerColon");
  let hourClock = document.getElementById("hourLabel");
  let minClock = document.getElementById("minuteLabel");
  let clockColon = document.getElementById("timeColon");
  let clockElements = [hourClock, minClock, clockColon];
  let clockClickBox = document.getElementById("setAlarmModeClickBox")
  // set up event listener
  let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements");

  let slimeButtonClick = () => slimeButtonClickFunctionality(tumblerElements);
  let clockButtonclick = () =>
  {
    tumblerColon.style.visibility = helper.toggleVisibilty(tumblerColon)
    animate.fadeElement(animateDisplayElements, 1, 0);
    tumblers.forEach((element) => {
      element.style.visibility = helper.toggleVisibilty(element);
    });
    clockElements.forEach((element) => {
      element.style.pointerEvents = "none"
      element.style.visibility = helper.toggleVisibilty(element);
    });
    //add slime event listener
    helper.eventListenerSetup(mainSlime, slimeButtonClick);
  }

  clockElements.forEach((clockElement) => {
    helper.eventListenerSetup(clockElement, clockButtonclick);
  });

  // helper.eventListenerSetup(clockClickBox, clockButtonclick);
  // event has a switch to tumblers, start flashing, get rid of the other elements
  // change the alarm

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

function slimeButtonClickFunctionality(tumblerElements){
  let arrayOfTumblerValues = []
  let arrayoftumblers = Object.keys(tumblerElements).map(key => tumblerElements[key]);
  arrayoftumblers.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value)
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`)
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });
  console.log(`${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`);
  let timeForAlarmBeingSet = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`
}
