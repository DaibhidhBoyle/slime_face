import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as alarm from '../../Alarm/alarm.js'
import * as snooze from '../../Alarm/snooze.js'
import * as systemInfo from './systemInfo.js'
import * as helper from '../../Helper/helper.js'
import * as components from '../../Helper/components.js'



export function timeSetup(){
  let clockHandles = establishClockHandles();

  clock.granularity = "seconds";

  clock.ontick = (evt) => {
    const now = evt.date;

    toUpdateOnTick(now, clockHandles.time, clockHandles.date)

  }


  let hrm = new HeartRateSensor();


  hrm.onreading = function() {
    components.heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();

}



function establishClockHandles(){

  // let hourHandle = document.getElementById("hourLabel");
  // let minHandle = document.getElementById("minuteLabel");


  return {
    time: {hour: components.hourClock, min: components.minClock},
    date: components.dateHandle
  }
}

function toUpdateOnTick(now, timeHandles, dateHandle){
  let timeAsString = timeSettings(now, timeHandles)
  let dayAsString =  daySettings(now)
  dayAsString = dayAsString.toUpperCase()

  dateSettings(now, dateHandle)
  systemInfo.systemSetup(now)


  snooze.alarmByTick(timeAsString, dayAsString);

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
