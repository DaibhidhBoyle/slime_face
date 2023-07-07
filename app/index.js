import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * as utils from "../companion/utils.js";
import * as script from './script.js';



//time

//Take in time from device and set update rate
let timeHandle = document.getElementById("timeLabel");
let dateHandle = document.getElementById("dateLabel");
let stepsHandle = document.getElementById("stepsLabel");
let batteryHandle = document.getElementById("batteryLabel");




clock.granularity = "minutes";

//Event to update clock display each second
clock.ontick = (evt) => {
  const now = evt.date;
  let hours = now.getHours();
  let mins = now.getMinutes();

  let hoursFormated = utils.timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = utils.zeroPad(mins, 2);

  timeHandle.text = `${hoursFormated}:${minsFormatted}`

  //date



  let date = now.getDate();
  let month = now.getMonth();

  let suffix = utils.dateSuffixCreator(date);
  let writtenMonth = utils.writtenMonth(month);

  dateHandle.text = `${date}${suffix} ${writtenMonth}`;

  //brings battery in from system
 let batteryValue = battery.chargeLevel;
 batteryHandle.text = `${batteryValue} %`;


 // bring step rate in from system



 let steps = (userActivity.today.adjusted["steps"] || 0);
 stepsHandle.text = utils.zeroPad(`${steps}`, 5);


}


// brings heart rate in from System

let heartrateHandle = document.getElementById("heartrateLabel");

// event to update heart rate readout on update

const hrm = new HeartRateSensor();


hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`;
}
hrm.start();


let slimeButton = document.getElementById("slime");

slimeButton.addEventListener("click", (evt) => {
   timeHandle.style.visibility = script.toggleVisibilty(timeHandle)
  dateHandle.style.visibility = script.toggleVisibilty(dateHandle)
  stepsHandle.style.visibility = script.toggleVisibilty(stepsHandle)
  heartrateHandle.style.visibility = script.toggleVisibilty(heartrateHandle)

});
