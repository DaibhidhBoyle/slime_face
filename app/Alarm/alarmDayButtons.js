import * as snooze from './snooze.js'
import * as helper from '../Helper/helper.js'
import * as components from '../Helper/components.js'

export let alarmSelectedTime;
export let alarmSelectedDays = []
export let alarmElements = [];


export function setAlarmDays(time) {

  alarmSelectedTime = time

  alarmElements = components.alarmDayGroup.getElementsByTagName("image");

  let sun = alarmElements.filter(element => element.id === "alarmSun");
  sun = sun[0]

  sun.style.visibility = helper.toggleVisibilty(sun)

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
    mushroom.style.visibility = helper.toggleVisibilty(mushroom);
    helper.eventListenerSetup(mushroom, mushroomClick(i));
  });

  return { sun: sunClick, mushroom: mushroomClick };
}



export function resetScreen(){

  helper.switchCornerButtons("visible", "hidden");

  components.hourClock.style.visibility = helper.toggleVisibilty(components.hourClock);
  components.minClock.style.visibility = helper.toggleVisibilty(components.minClock);
  components.dateHandle.style.visibility = helper.toggleVisibilty(components.dateHandle);
  components.clockColon.style.visibility = helper.toggleVisibilty(components.clockColon);

  // alarmElements.forEach((element) => {
  //   element.style.visibility = helper.toggleVisibilty(element);
  // });

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
    snooze.setNewAlarm(newAlarmToBeSet)

  }
}

export function resetAlarmElements(alarmElementListeners) {

  alarmSelectedTime = undefined;
  alarmSelectedDays = [];
  components.tumblerHour.value = 0;
  components.tumblerMin.value = 0;

  alarmElements.forEach((element) => {

    if (element.image === "images/setAlarmDay/sun.png" || element.image === "images/setAlarmDay/unselectedSun.png") {
      element.image = "images/setAlarmDay/unselectedSun.png";
    } else {
      element.image = element.image.replace(/Green/g, "Red");
    }
  });

  components.setSlimeButtonState(1)



  setAlarmDays()
}
