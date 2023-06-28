import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * utils from "../common/utils";
import * as script from 'script.js';

//Take in time from device and set update rate
const timeHandle = document.getElementById("timeLabel");
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
}
