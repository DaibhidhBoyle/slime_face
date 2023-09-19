import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import userActivity from "user-activity";
import * as utils from "../companion/utils.js";
import * as script from './script.js'
import * as helper from './helper.js'



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


  //system info

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

let toggableHTMLElements = document.getElementsByClassName("HiddenOrVisible")

let jumpFrames = document.getElementsByClassName("jumpAnimation");

jumpFrames = [slimeButton, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), slimeButton];

let jumpFrameTimes = [75, 75, 75, 75, 75, 75, 75, 1700, 1000, 0]



slimeButton.addEventListener("click", function() {
  // change the information elements
  toggableHTMLElements.forEach(htmlElement => {
    htmlElement.style.visibility = helper.toggleVisibilty(htmlElement);
  });
  //cause the jump animation
  script.visibilityAnimation(jumpFrames, jumpFrameTimes);
});


  //button that causes fishing animation with random fish

let fishButton = document.getElementsByClassName("fishClickable");

let fishWinFrames = {
  anchovy : { image: document.getElementById("anchovy"), text: "anc" },
  blob: { image: document.getElementById("blobfish"), text: "blob" },
  boot: { image: document.getElementById("boot"), text: "boot" },
  bream: { image: document.getElementById("bream"), text: "bream" },
  crimson: { image: document.getElementById("crimson"), text: "crimson" }
  };

let fishFrames = document.getElementsByClassName("fishAnimation");

fishFrames = [slimeButton, ...fishFrames, fishFrames[6], fishFrames[7], fishFrames[6], fishFrames[7], slimeButton]

let fishFrameTimes = [75, 75, 75, 75, 75, 75, 75, 1300, 500, 1200, 500, 1200, 1000, 0]

let prizeContainer = document.getElementById("prizeContainer");

let prizeFish = ""

function handleFishButtonClick() {
  prizeFish = helper.whichFish(fishWinFrames);
  script.visibilityAnimation(fishFrames, fishFrameTimes,
    () => {
    script.showPrizeFish(prizeFish);
  }
)};

fishButton.forEach(fishClickableElement => {
  fishClickableElement.addEventListener("click", handleFishButtonClick);
});


//
// let fishButton = document.getElementsByClassName("fishClickable");
// let fishFrames = document.getElementsByClassName("fishAnimation");
// let fishFrameTimes = [75, 75, 75, 75, 75, 75, 75, 1300, 500, 1200, 500, 1200, 1000, 0];
// let prizeFish = "";
// let isAnimating = false; // Flag to track animation status
//
// function handleFishButtonClick() {
//   // Check if an animation is already in progress
//   if (isAnimating) {
//     return;
//   }
//
//   // Set the flag to indicate animation is in progress
//   isAnimating = true;
//
//   prizeFish = script.whichFish();
//   console.log(prizeFish);
//   visibilityAnimation(fishFrames, fishFrameTimes);
//
//   // After the animation duration (in this case, after 2.8 seconds), reset the flag
//   setTimeout(() => {
//     isAnimating = false;
//   }, 2800);
// }
//
// fishClickableElements.forEach(fishClickableElement => {
//   fishClickableElement.addEventListener("click", handleFishButtonClick);
// });

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
