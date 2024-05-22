//---IMPORTS---
//document
import document from "document";
//----
// helper imports
import { toggleVisibilty, eventListenerSetup, switchCornerButtons } from '../Helper/helper.js';
import { hourClock, minClock, clockColon, tumblerColon, displayGroup, dateClock, setSlimeButtonState } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
import { setUpTumblerStyle, deleteTumblerElement, tumblerElements } from './setUpAlarmTumbler.js';
import { setAlarmDays } from './alarmDayButtons.js';
//----
//external file imports
//----

//---EXPORTS---
//variables
export let alarmElements = [];
//----
//display elements
//----
//----

//---BODY---
//variables
let clockElements = [];
let cornerButtons = [];
//----
//main body

export function alarmTimeBoot(mainSlime) {
  setUpTumblerStyle(deleteTumblerElement, "No Alarm Set");
  setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime);
}

function setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime){
  let tumblers = Object.keys(tumblerElements).map(key => tumblerElements[key].tumbler);

  clockElements = [hourClock, minClock, clockColon];

  let clockButtonclick = () => {
    tumblerColon.style.visibility = toggleVisibilty(tumblerColon);

    tumblers.forEach((element) => {
      element.style.visibility = toggleVisibilty(element);
    });

    displayGroup.forEach((element) => {
      element.style.pointerEvents = "none";
      element.style.visibility = "hidden";
    });

    switchCornerButtons("hidden", "hidden", "visible");
    setSlimeButtonState(2);
  };

  clockElements.forEach((clockElement) => {
    eventListenerSetup(clockElement, clockButtonclick);
  });

  clockElements.push(dateClock);
}

export function slimeButtonClickFunctionality(tumblerElements) {
  let arrayOfTumblerValues = [];
  let arrayOfTumblerInfo = Object.keys(tumblerElements).map(key => tumblerElements[key]);

  arrayOfTumblerInfo.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value);
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`);
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });

  let arrayOfTumblers = arrayOfTumblerInfo.map(item => item.tumbler);
  let alarmSelectedTime = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`;

  setSlimeButtonState(3);

  return slimeButtonClickSwitchToNextScreen(alarmSelectedTime, arrayOfTumblers);
}

function slimeButtonClickSwitchToNextScreen(time, arrayOfTumblers){
  arrayOfTumblers.forEach((element) => {
    element.style.visibility = toggleVisibilty(element);
  });

  tumblerColon.style.visibility = toggleVisibilty(tumblerColon);

  alarmElements.forEach((button) => {
    button.style.visibility = toggleVisibilty(button);
  });

  switchCornerButtons("hidden", "hidden", "hidden");

  return setAlarmDays(time);
}
