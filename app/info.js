import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * as alarm from './alarm.js'
import * as helper from './helper.js'


export function infomaticsBoot(){
  let clockHandles = establishClockHandles();

  clock.granularity = "seconds";

  clock.ontick = (evt) => {
    const now = evt.date;

    toUpdateOnTick(now, clockHandles.time, clockHandles.date)

  }

  let heartrateHandle = document.getElementById("heartrateLabel");
  let hrm = new HeartRateSensor();


  hrm.onreading = function() {
    heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();

}



function establishClockHandles(){

  let hourHandle = document.getElementById("hourLabel");
  let minHandle = document.getElementById("minuteLabel");
  let dateHandle = document.getElementById("dateLabel");

  return {
    time: {hour: hourHandle, min: minHandle},
    date: dateHandle
  }
}

function toUpdateOnTick(now, timeHandles, dateHandle){
  let timeAsString = timeSettings(now, timeHandles)
  let dayAsString =  daySettings(now)
  dayAsString = dayAsString.toUpperCase()

  dateSettings(now, dateHandle)
  systemSetup(now)


  alarm.alarmByTick(timeAsString, dayAsString);

}

function timeSettings(now, timeHandles){

  let hours = now.getHours().toString();
  let mins = now.getMinutes().toString();

  let hoursFormatted = helper.timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = helper.zeroPad(mins, 2);

  timeHandles.hour.text = `${hoursFormatted}`
  timeHandles.min.text = `${minsFormatted}`

  let timeAsString = `${hoursFormatted}:${minsFormatted}`

  return timeAsString
}

function daySettings(now){
  
  let dayAsNumber = now.getDay();

  let day = helper.writtenDay(dayAsNumber);

  return day
}

function dateSettings(now, dateHandle){
  let date = now.getDate();
  let month = now.getMonth();

  let suffix = helper.dateSuffixCreator(date);
  let writtenMonth = helper.writtenMonth(month);

  dateHandle.text = `${date}${suffix} ${writtenMonth}`;
}

function systemSetup(now){

  let stepsHandle = document.getElementById("stepsLabel");
  let batteryHandle = document.getElementById("batteryLabel");

  let batteryValue = battery.chargeLevel;
  batteryHandle.text = `${batteryValue} %`;

  let steps = (userActivity.today.adjusted["steps"] || 0);
  stepsHandle.text = helper.zeroPad(`${steps}`, 5);

}

export function toggleInfoElements(elements){
  elements.forEach(element => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
}
