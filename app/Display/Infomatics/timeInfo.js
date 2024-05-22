//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { zeroPad, timePrefrence, writtenDay, dateSuffixCreator, writtenMonth } from '../../Helper/helper.js';
import { hourClock, minClock, dateClock, heartrateHandle } from '../../Helper/components.js';
//----
//system imports
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
//----
//local file imports
//--Infomatics
import { systemSetup } from './systemInfo.js';
//--Buttons
//--Display
//----
//external file imports
import { alarmBoot } from '../../Alarm/alarm.js';
import { alarmByTick } from '../../Alarm/snooze.js';
//----
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

export function timeSetup(){
  let clockHandles = establishClockHandles();

  clock.granularity = "seconds";

  clock.ontick = (evt) => {
    const now = evt.date;

    toUpdateOnTick(now, clockHandles.time, clockHandles.date)

  }


  let hrm = new HeartRateSensor();


  hrm.onreading = function() {
    heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();

}



function establishClockHandles(){

  return {
    time: {hour: hourClock, min: minClock},
    date: dateClock
  }
}

function toUpdateOnTick(now, timeHandles, dateHandle){
  let timeAsString = timeSettings(now, timeHandles)
  let dayAsString =  daySettings(now)
  dayAsString = dayAsString.toUpperCase()

  dateSettings(now, dateHandle)
  systemSetup(now)


  alarmByTick(timeAsString, dayAsString);

}

function timeSettings(now, timeHandles){

  let hours = now.getHours().toString();
  let mins = now.getMinutes().toString();

  let hoursFormatted = timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = zeroPad(mins, 2);

  timeHandles.hour.text = `${hoursFormatted}`
  timeHandles.min.text = `${minsFormatted}`

  let timeAsString = `${hoursFormatted}:${minsFormatted}`

  return timeAsString
}

function daySettings(now){

  let dayAsNumber = now.getDay();

  let day = writtenDay(dayAsNumber);

  return day
}

function dateSettings(now, dateHandle){
  let date = now.getDate();
  let month = now.getMonth();

  let suffix = dateSuffixCreator(date);
  let writtenOutMonth = writtenMonth(month);

  dateHandle.text = `${date}${suffix} ${writtenOutMonth}`;
}
