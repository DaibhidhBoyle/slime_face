import document from "document";
import { vibration } from "haptics";
import * as alarm from './alarm.js'
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

export let alarmSelectedTime;
export let alarmSelectedDays = []
export let alarmElements = [];

export let tumblerHour;
export let tumblerMin;

export let slimeButtonState = 1

let clockElements = []




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
  // grab elements for tumblers
  let tumblerColon = document.getElementById("tumblerColon");
  let hourClock = document.getElementById("hourLabel");
  let minClock = document.getElementById("minuteLabel");
  let clockColon = document.getElementById("timeColon");
  clockElements = [hourClock, minClock, clockColon];
  // elements for setting days
  let alarmDayGroup = document.getElementById("alarmDaySettings");
  alarmElements = [...alarmDayGroup.children];
  //element for animating
  let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements")
  let infoGroup = document.getElementById("displayElements");
  let infoChildrenText = infoGroup.getElementsByTagName("text")
  let infoChildrenImages = infoGroup.getElementsByTagName("image");
  let infoChildren = infoChildrenText.concat(infoChildrenImages);
  // set up event listener
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

    slimeButtonState = 2

  }

  clockElements.forEach((clockElement) => {
    helper.eventListenerSetup(clockElement, clockButtonclick);
  });

  let date = document.getElementById("dateLabel");

  clockElements.push(date)
}


export function bothTumblersIntoInformationDictionaries(tumblerHour, tumblerMin){
  return {"hour": { "tumbler": tumblerHour, "itemIdPrefix": "hour-item", "numberOfItems": 23 }, "min": {"tumbler": tumblerMin, "itemIdPrefix": "min-item", "numberOfItems": 59}}
};

export function slimeButtonClickFunctionality(tumblerElements){

  slimeButtonState = 3

  let arrayOfTumblerValues = []
  let arrayOfTumblerInfo = Object.keys(tumblerElements).map(key => tumblerElements[key]);
  arrayOfTumblerInfo.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value)
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`)
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });

  let arrayOfTumblers = arrayOfTumblerInfo.map(item => item.tumbler);

  alarmSelectedTime = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`

  return slimeButtonClickSwitchToNextScreen(alarmSelectedTime, arrayOfTumblers)

}

function slimeButtonClickSwitchToNextScreen(time, arrayOfTumblers){
  arrayOfTumblers.forEach((element) => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
  let tumblerColon = document.getElementById("tumblerColon");
  tumblerColon.style.visibility = helper.toggleVisibilty(tumblerColon);

  alarmElements.forEach((button) => {
    button.style.visibility = helper.toggleVisibilty(button);
  })

  return setAlarmDays(alarmElements)
}

export function setAlarmDays(alarmElements) {
  console.log(alarmElements.length);
  let sun = alarmElements.filter(element => element.id === "alarmSun");
  sun = sun[0]

  let alarmMushrooms = alarmElements.filter(element => element !== sun);


  let sunClick = () => {
    let isSunUnselected = sun.image === "images/setAlarmDay/unselectedSun.png";

    if (isSunUnselected) {
      alarmMushrooms.forEach((mushroom, i) => {
        mushroom.image = mushroom.image.replace(/Red/g, "Green");
      });

      alarmSelectedDays = [0, 1, 2, 3, 4, 5, 6];
    } else if (!isSunUnselected) {
      alarmSelectedDays = [];
      alarmMushrooms.forEach((mushroom, i) => {
        mushroom.image = mushroom.image.replace(/Green/g, "Red");
      });
    }

    sun.image = isSunUnselected ? "images/setAlarmDay/sun.png" : "images/setAlarmDay/unselectedSun.png";
  };


  helper.eventListenerSetup(sun, sunClick);

  let mushroomClick = (i) => {
    return () => {

      let isMushroomUnselected = alarmMushrooms[i].image === `images/setAlarmDay/mushroomRed${i + 1}.png`;

      if (isMushroomUnselected) {
        alarmSelectedDays.push(i);
      }

      if (!isMushroomUnselected) {
        if (alarmSelectedDays.indexOf(i) !== -1) {
          alarmSelectedDays.splice(alarmSelectedDays.indexOf(i), 1);
        }
      }

      if (alarmSelectedDays.length === 7) {
        sun.image = "images/setAlarmDay/sun.png"
      } else {
        sun.image = "images/setAlarmDay/unselectedSun.png"
      }

      alarmMushrooms[i].image = isMushroomUnselected ? `images/setAlarmDay/mushroomGreen${i + 1}.png` : `images/setAlarmDay/mushroomRed${i + 1}.png`;
    };
  };

  alarmMushrooms.forEach((mushroom, i) => {
    helper.eventListenerSetup(mushroom, mushroomClick(i));
  });

  return { sun: sunClick, mushroom: mushroomClick };
}



export function resetScreen(){
  alarmElements.forEach((element) => {
    element.style.visibility = helper.toggleVisibilty(element);
  });

  clockElements.forEach((element) => {
    element.style.visibility = helper.toggleVisibilty(element);
  });

}

export function sendToAlarm(){
  let dayWrittenOut = []

  alarmSelectedDays.sort(function(a, b) {
    return a - b;
  });

  alarmSelectedDays.forEach((dayAsNumber) => {
    let day = helper.writtenDay(dayAsNumber);
    dayWrittenOut.push(day)
  });

  let newAlarmToBeSet = { [alarmSelectedTime]: dayWrittenOut };
  alarm.setNewAlarm(newAlarmToBeSet)
}

export function resetAlarmElements(alarmElementListeners) {

  slimeButtonState = 2
  alarmSelectedTime = undefined;
  alarmSelectedDays = [];
  tumblerHour.value = 0;
  tumblerMin.value = 0;

  alarmElements.forEach((element) => {

    if (element.image === "images/setAlarmDay/sun.png" || element.image === "images/setAlarmDay/unselectedSun.png") {
      element.image = "images/setAlarmDay/unselectedSun.png";
    } else {
      element.image = element.image.replace(/Green/g, "Red");
    }
  });

  setAlarmDays(alarmElements)
}
