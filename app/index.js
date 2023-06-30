import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * as utils from "../companion/utils.js";
import * as script from './script.js';


// brings heart rate in from System

let heartrateHandle = document.getElementById("heartrateLabel");

// event to update heart rate readout on update

const hrm = new HeartRateSensor();


hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`;
}
hrm.start();


//time

//Take in time from device and set update rate
let timeHandle = document.getElementById("timeLabel");
clock.granularity = "seconds";

//Event to update clock display each second
clock.ontick = (evt) => {
  const now = evt.date;
  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();

  let hoursFormated = utils.timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = utils.zeroPad(mins);
  let secsFormatted = utils.zeroPad(secs);

  timeHandle.text = `${hoursFormated}:${minsFormatted}:${secsFormatted}`

  //date

  let dateHandle = document.getElementById("dateLabel");

  let date = now.getDate();
  let month = now.getMonth();

  let suffix = utils.dateSuffixCreator(date);
  let writtenMonth = utils.writtenMonth(month);

  dateHandle.text = `${date}${suffix} ${writtenMonth}`;
}

// bring step rate in from system

let stepsHandle = document.getElementById("stepsLabel");

let steps = (userActivity.today.adjusted["steps"] || 0);
stepsHandle.text = steps;
