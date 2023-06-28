import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad, } from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";

const timeHandle = document.getElementById("timeLabel"); 
clock.granularity = "seconds";
