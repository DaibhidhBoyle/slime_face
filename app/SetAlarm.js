import document from "document";
import { vibration } from "haptics";
import * as alarm from './alarm.js'
import * as mood from './mood.js'
import * as animate from './animations.js'
import * as helper from './helper.js'

export let alarmSelectedTime;
export let alarmSelectedDays = []
export let alarmElements = [];

export let tumblerColon;
export let tumblerHour;
export let tumblerMin;
export let deleteTumblerElement


export let slimeButtonState = 1

let clockElements = []
let cornerButtons = []



export function setAlarmBoot(mainSlime){

  tumblerHour = document.getElementById("tumbler-hour");
  tumblerMin = document.getElementById("tumbler-mins");
  let tumblerElements = bothTumblersIntoInformationDictionaries(tumblerHour, tumblerMin);

  setUpTumblerStyle(tumblerElements["hour"]);
  setUpTumblerStyle(tumblerElements["min"]);

  let tumblerDelete = document.getElementById("tumbler-delete");
  deleteTumblerElement = {"tumbler": tumblerDelete, "itemIdPrefix": "delete-item", "numberOfItems": 14 }

  setUpTumblerStyle(deleteTumblerElement, "No Alarm Set");

  setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime);
}

function setUpTumblerStyle(tumblerElement, baseTextValue){

  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++){
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i)

    let itemTextContainer = item.getElementById("text");

    if (baseTextValue === undefined){
      itemTextContainer.text = helper.zeroPad(`${i}`, 2)
      itemTextContainer.style.fontSize = 150
    }
    else{
      itemTextContainer.text = baseTextValue
      itemTextContainer.style.fontSize = 60
    }

    itemTextContainer.style.fontFamily = "Tungsten-Medium"

    itemTextContainer.style["fill"] = "#f887bd";

  }

}


function setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime){
  let tumblers = Object.keys(tumblerElements).map(key => tumblerElements[key].tumbler);
  // grab elements for tumblers
  tumblerColon = document.getElementById("tumblerColon");

  let hourClock = document.getElementById("hourLabel");
  let minClock = document.getElementById("minuteLabel");
  let clockColon = document.getElementById("timeColon");
  clockElements = [hourClock, minClock, clockColon];
  // elements for setting days
  let alarmDayGroup = document.getElementById("alarmDaySettings");
  alarmElements = alarmDayGroup.getElementsByTagName("image");
  // alarmElements = [...alarmDayGroup.children];
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

    tumblers.forEach((element) => {
      element.style.visibility = helper.toggleVisibilty(element);
    });

    infoChildren.forEach((element) => {
      element.style.pointerEvents = "none"
      element.style.visibility = "hidden";
    });

    switchCornerButtons("hidden", "visible");

    slimeButtonState = 2

  }

  clockElements.forEach((clockElement) => {
    helper.eventListenerSetup(clockElement, clockButtonclick);
  });

  let date = document.getElementById("dateLabel");

  clockElements.push(date)



  // let deleteAlarmElements = cornerButtons.filter(element => element.class === "deleteAlarmClickable");
  //
  // let deleteButtonclick = () =>
  // {
  //   console.log("fuck");
  //
  //   tumblerColon.style.visibility = helper.toggleVisibilty(tumblerColon)
  //
  //   tumblers.forEach((element) => {
  //     element.style.visibility = helper.toggleVisibilty(element);
  //   });
  //
  //   mainSlime.style.visibility = helper.toggleVisibilty(mainSlime);
  //
  //   alarm.populateDeleteAlarmTumbler(deleteTumblerElement);
  //
  //   deleteTumblerElement["tumbler"].style.visibility = helper.toggleVisibilty(deleteTumblerElement["tumbler"]);
  //
  //
  //
  // }
  //
  // deleteAlarmElements.forEach((deleteElement) => {
  //   helper.eventListenerSetup(deleteElement, deleteButtonclick);
  // });
  //

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

  switchCornerButtons("hidden", "hidden")

  return setAlarmDays(alarmElements)
}

export function setAlarmDays(alarmElements) {



  let sun = alarmElements.filter(element => element.id === "alarmSun");
  sun = sun[0]

  let alarmMushrooms = alarmElements.filter(element => element !== sun);

  alarmSelectedDays = []
  alarmMushrooms.forEach((mushroom, i) => {
    mushroom.image = mushroom.image.replace(/Green/g, "Red");
  });


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

      console.log("mushroom clicked");

      let isMushroomUnselected = alarmMushrooms[i].image === `images/setAlarmDay/mushroomRed${i}.png`;

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

      alarmMushrooms[i].image = isMushroomUnselected ? `images/setAlarmDay/mushroomGreen${i}.png` : `images/setAlarmDay/mushroomRed${i}.png`;
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

  if (dayWrittenOut.length !== 0){

    let newAlarmToBeSet = { "time": alarmSelectedTime, "days": dayWrittenOut };
    alarm.setNewAlarm(newAlarmToBeSet)

  }
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

  switchCornerButtons("visible", "hidden")

  setAlarmDays(alarmElements)
}


function switchCornerButtons(group1Visibilty, group2Visibilty) {

  let timerButtonElements = document.getElementById("timerButtons");
  let deleteButtonElements = document.getElementById("deleteButtons")

  timerButtonElements.children.forEach((timerButtonsElement) => {
    timerButtonsElement.style.visibility = group1Visibilty;
  });

  // tumblers.forEach((element) => {
  //   element.style.visibility = helper.toggleVisibilty(element);
  // });

  deleteButtonElements.children.forEach((deleteButtonElement) => {
    deleteButtonElement.style.visibility = group2Visibilty;
  });

}
