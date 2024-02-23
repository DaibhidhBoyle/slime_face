import document from "document";
import { vibration } from "haptics";
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

export let tumblerHour;
export let tumblerMin

export function setAlarmBoot(mainSlime){
  tumblerHour = document.getElementById("tumbler-hour");
  tumblerMin = document.getElementById("tumbler-mins");
  let tumblerElements = bothTumblersIntoInformationDictionaries(tumblerHour, tumblerMin);

  setUpTumblerStyle(tumblerElements["hour"]);
  setUpTumblerStyle(tumblerElements["min"]);

  setAlarmMode(tumblerElements, mainSlime);
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
  // set up event listener
  let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements")
  let infoGroup = document.getElementById("displayElements");
  let infoChildrenText = infoGroup.getElementsByTagName("text")
  let infoChildrenImages = infoGroup.getElementsByTagName("image");
  let infoChildren = infoChildrenText.concat(infoChildrenImages);

  let slimeButtonClick = () => slimeButtonClickFunctionality(tumblerElements)
  let clockButtonclick = () =>
  {
    tumblerColon.style.visibility = helper.toggleVisibilty(tumblerColon)
    // animate.fadeElement(animateDisplayElements, 1, 0);

    tumblers.forEach((element) => {
      element.style.visibility = helper.toggleVisibilty(element);
    });
    infoChildren.forEach((element) => {
      element.style.pointerEvents = "none"
      element.style.visibility = "hidden";
    });
    //add slime event listener
    // helper.eventListenerSetup(mainSlime, slimeButtonClick);
  }

  clockElements.forEach((clockElement) => {
    helper.eventListenerSetup(clockElement, clockButtonclick);
  });

  // helper.eventListenerSetup(clockClickBox, clockButtonclick);
  // event has a switch to tumblers, start flashing, get rid of the other elements
  // change the alarm
}


export function bothTumblersIntoInformationDictionaries(tumblerHour, tumblerMin){
  return {"hour": { "tumbler": tumblerHour, "itemIdPrefix": "hour-item", "numberOfItems": 23 }, "min": {"tumbler": tumblerMin, "itemIdPrefix": "min-item", "numberOfItems": 59}}
};

export function slimeButtonClickFunctionality(tumblerElements){
  let arrayOfTumblerValues = []
  let arrayOfTumblerInfo = Object.keys(tumblerElements).map(key => tumblerElements[key]);
  arrayOfTumblerInfo.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value)
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`)
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });
  let arrayOfTumblers = arrayOfTumblerInfo.map(item => item.tumbler);
  console.log(arrayOfTumblerInfo.length);
  console.log(`${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`);
  let timeForAlarmBeingSet = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`

  slimeButtonClickSwitchToNextScreen(timeForAlarmBeingSet, arrayOfTumblers)

}

function slimeButtonClickSwitchToNextScreen(time, arrayOfTumblers){
  arrayOfTumblers.forEach((element) => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
  let tumblerColon = document.getElementById("tumblerColon");
  tumblerColon.style.visibility = helper.toggleVisibilty(tumblerColon);

  let alarmDayGroup = document.getElementById("alarmDaySettings");
  let sun = alarmDayGroup.getElementById("alarmSun");
  let alarmMushroomsWithSun = [...alarmDayGroup.children];
  let alarmMushrooms = alarmMushroomsWithSun.filter(element => element !== sun);

  alarmMushroomsWithSun.forEach((button) => {
    button.style.visibility = helper.toggleVisibilty(button);
  })


}
