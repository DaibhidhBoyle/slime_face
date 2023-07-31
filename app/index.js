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
  let hours = now.getHours().toString();
  let mins = now.getMinutes().toString();

  let hoursFormatted = utils.timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = utils.zeroPad(mins, 2);

  timeHandle.text = `${hoursFormatted}:${minsFormatted}`

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

let hrm = new HeartRateSensor();


hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`;
}

hrm.start();

// slime button that switches between different displays
let slimeButton = document.getElementById("slime");

let toggableHTMLElements = document.getElementsByClassName("HiddenOrVisible");

let jumpFrames = document.getElementsByClassName("jumpAnimation");

jumpFrames = [slimeButton, jumpFrames[0], jumpFrames[1], jumpFrames[2], jumpFrames[3], jumpFrames[2], jumpFrames[1], jumpFrames[0], jumpFrames[4], jumpFrames[5], jumpFrames[6], slimeButton]


// let slimeAnimationFrameNames = ["1stMainSlime",
//                             "2ndSlime",
//                             "3rdSlime",
//                             "4thSlime",
//                             "5thSlime",
//                             "6thSlime",
//                             "7thSlime",
//                             "8thSlime",
//                             "1stMainSlime"]
//
// let slimeAnimationFrames = []
//
// for (let name of slimeAnimationFrameNames) {
//   slimeAnimationFrames.push(script.imageLinkConstructor(name, "slimes"));
// }



slimeButton.addEventListener("click", (evt) => {
  toggableHTMLElements.forEach(htmlElement => {
    htmlElement.style.visibility = script.toggleVisibilty(htmlElement);
  });
  for (let i = 1; i < jumpFrames.length; i++) {
  (function(index) {
    setTimeout(() => {
      jumpFrames[index].style.visibility = script.toggleVisibilty(jumpFrames[index]);
      jumpFrames[index - 1].style.visibility = script.toggleVisibilty(jumpFrames[index - 1]);
    }, index * 75);
  })(i);
}
});




//     let currentIndex = 0;
//
//     function changeImage() {
//       slimeButton.href = slimeAnimationFrames[currentIndex];
//       currentIndex = currentIndex + 1
// }
//
// const intervalId = setInterval(changeImage, 2000);

    // setTimeout(() => {
    //   clearInterval(intervalId);
    // }, 10000);


// let frames = document.getElementById("slimeAnimation").children;
// let frameCount = frames.length;
//
// let i = 0;
// setInterval(function () {
//     frames[i % frameCount].style.visibility = "hidden";
//     frames[++i % frameCount].style.display = "visible";
// }, 100);
//
