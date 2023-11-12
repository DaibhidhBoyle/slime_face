import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * as helper from './helper.js'


export function infomaticsBoot(){
  let clockHandles = establishClockHandles();

  clock.granularity = "minutes";

  clock.ontick = (evt) => {
    const now = evt.date;

    let hours = now.getHours().toString();
    let mins = now.getMinutes().toString();

    let hoursFormatted = helper.timePrefrence(preferences.clockDisplay, hours)
    let minsFormatted = helper.zeroPad(mins, 2);

    clockHandles.time.text = `${hoursFormatted}:${minsFormatted}`

    toUpdateOnTick(now, clockHandles.date)
  }
}



function establishClockHandles(){

  let timeHandle = document.getElementById("timeLabel");
  let dateHandle = document.getElementById("dateLabel");

  return {
    time: timeHandle,
    date: dateHandle
  }
}

function toUpdateOnTick(now, dateHandle){
  dateSettings(now, dateHandle)
  systemSetup(now)
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

  let heartrateHandle = document.getElementById("heartrateLabel");

  let hrm = new HeartRateSensor();


  hrm.onreading = function() {
    heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();

}

export function toggleInfoElements(elements){
  elements.forEach(element => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
}
