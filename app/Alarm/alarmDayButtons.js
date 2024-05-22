//---IMPORTS---
//document
//----
//helper imports
import { toggleVisibilty, eventListenerSetup, switchCornerButtons, writtenDay } from '../Helper/helper.js';
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

  sun.style.visibility = toggleVisibilty(sun);

  let alarmMushrooms = alarmElements.filter(element => element !== sun);

  alarmSelectedDays = [];
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

  eventListenerSetup(sun, sunClick);

  let mushroomClick = (i) => {
    return () => {
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
        sun.image = "images/setAlarmDay/sun.png";
      } else {
        sun.image = "images/setAlarmDay/unselectedSun.png";
      }

      alarmMushrooms[i].image = isMushroomUnselected ? `images/setAlarmDay/mushroomGreen${i}.png` : `images/setAlarmDay/mushroomRed${i}.png`;
    };
  };

  alarmMushrooms.forEach((mushroom, i) => {
    mushroom.style.visibility = toggleVisibilty(mushroom);
    eventListenerSetup(mushroom, mushroomClick(i));
  });

  return { sun: sunClick, mushroom: mushroomClick };
}

export function resetScreen() {
  switchCornerButtons("visible", "hidden", "hidden");

  hourClock.style.visibility = toggleVisibilty(hourClock);
  minClock.style.visibility = toggleVisibilty(minClock);
  dateClock.style.visibility = toggleVisibilty(dateClock);
  clockColon.style.visibility = toggleVisibilty(clockColon);
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

  if (dayWrittenOut.length !== 0) {
    let newAlarmToBeSet = { "time": alarmSelectedTime, "days": dayWrittenOut };
    setNewAlarm(newAlarmToBeSet);
  }
}

export function resetAlarmElements(alarmElementListeners) {
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

  setSlimeButtonState(1);

  setAlarmDays();
}
