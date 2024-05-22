//---IMPORTS---
//document
//----
//helper imports
import { toggleVisibility, toggleManyVisibility, eventListenerSetup, switchCornerButtons, writtenDay } from '../Helper/helper.js';
import { alarmDayGroup, hourClock, minClock, dateClock, clockColon, tumblerHour, tumblerMin, setSlimeButtonState } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
import { setNewAlarm } from './snooze.js';
//----
//external file imports
//----

//---EXPORTS---
//variables
export let alarmSelectedTime;
export let alarmSelectedDays = [];
export let alarmElements = [];
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

export function setAlarmDays(time) {
  alarmSelectedTime = time;

  alarmElements = alarmDayGroup.getElementsByTagName("image");

  let sun = alarmElements.filter(element => element.id === "alarmSun");
  sun = sun[0];

  toggleVisibility(sun);

  let alarmMushrooms = alarmElements.filter(element => element !== sun);
  setAllMushrooms(alarmMushrooms, "Red")

  alarmSelectedDays = [];
  eventListenerSetup(sun, () => toggleSun(sun, alarmMushrooms));

  alarmMushrooms.forEach((mushroom, i) => {
    toggleVisibility(mushroom);
    eventListenerSetup(mushroom, () => toggleMushroom(i, sun, alarmMushrooms));
  });

  return { sun: () => toggleSun(sun, alarmMushrooms), mushroom: (i) => toggleMushroom(i, sun, alarmMushrooms) };
}

function toggleSun(sun, alarmMushrooms) {
  let isSunUnselected = sun.image === "images/setAlarmDay/unselectedSun.png";
  let newColor = isSunUnselected ? "Green" : "Red";

  setAllMushrooms(alarmMushrooms, newColor);
  alarmSelectedDays = isSunUnselected ? [0, 1, 2, 3, 4, 5, 6] : [];

  sun.image = isSunUnselected ? "images/setAlarmDay/sun.png" : "images/setAlarmDay/unselectedSun.png";
}

function setAllMushrooms(mushrooms, color) {
  mushrooms.forEach(mushroom => {
    mushroom.image = mushroom.image.replace(/Green|Red/g, color);
  });
}

function toggleMushroom(i, sun, alarmMushrooms) {
  let mushroom = alarmMushrooms[i];
  let isMushroomUnselected = mushroom.image === `images/setAlarmDay/mushroomRed${i}.png`;

  if (isMushroomUnselected) {
    alarmSelectedDays.push(i);
  }

  if (!isMushroomUnselected) {
    let index = alarmSelectedDays.indexOf(i);
    if (index !== -1) {
      alarmSelectedDays.splice(index, 1);
    }
  }

  mushroom.image = isMushroomUnselected ? `images/setAlarmDay/mushroomGreen${i}.png` : `images/setAlarmDay/mushroomRed${i}.png`;
  sun.image = alarmSelectedDays.length === 7 ? "images/setAlarmDay/sun.png" : "images/setAlarmDay/unselectedSun.png";
}









export function resetScreen() {
  switchCornerButtons("visible", "hidden", "hidden");

   toggleManyVisibility([hourClock, minClock, dateClock, clockColon])
}

export function sendToAlarm() {
  let dayWrittenOut = [];

  alarmSelectedDays.sort(function (a, b) {
    return a - b;
  });

  alarmSelectedDays.forEach((dayAsNumber) => {
    let day = writtenDay(dayAsNumber);
    dayWrittenOut.push(day);
  });

  if (dayWrittenOut.length > 0) {
    setNewAlarm({ "time": alarmSelectedTime, "days": dayWrittenOut });
  }
}

export function resetAlarmElements(alarmElementListeners) {
  alarmSelectedTime = undefined;
  alarmSelectedDays = [];
  tumblerHour.value = 0;
  tumblerMin.value = 0;

  alarmElements.forEach(element => {
    if (element.id === "alarmSun") {
      element.image = "images/setAlarmDay/unselectedSun.png";
    }

    if (element.id !== "alarmSun") {
      element.image = element.image.replace(/Green/g, "Red");
    }
  });

  setSlimeButtonState(1);

  setAlarmDays();
}
