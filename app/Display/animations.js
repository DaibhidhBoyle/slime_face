//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { toggleVisibility, toggleOpacity, whichFish } from '../Helper/helper.js';
//----
//system imports
//----
//local file imports
//----
//external file imports
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

export function startButtonAnimation(frames, animationTimes, clickData, secondaryAnimationTime = null, secondaryAnimationCallback = null, ) {
  let timeFrames = [...animationTimes]
  if (typeof secondaryAnimationCallback === 'function') {
    visibilityAnimation(frames, timeFrames, secondaryAnimationCallback);
    timeFrames.push(secondaryAnimationTime);
  } else {
    visibilityAnimation(frames, timeFrames);
  }
  disableButtonForAnimation(clickData, timeFrames);
}

async function visibilityAnimation(frames, times, callback = null) {
  for (let i = 1; i < frames.length; i++) {
    frames[i].extraFrame && extraFrameAnimation(frames[i].extraFrame);
    toggleVisibility(frames[i].frame);
    if (frames[i - 1].extraFrame && frames[i - 1].extraFrame.animationType === "snap"){
      extraFrameAnimation(frames[i-1].extraFrame);
    }
    toggleVisibility(frames[i - 1].frame);
    await waitForNextFrame(times[i]);
  }
  if (typeof callback === 'function') {
    callback();
  }
}

function waitForNextFrame(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extraFrameAnimation(extraFrameInfo) {
  if (extraFrameInfo.animationType === "snap") {
    extraFrameInfo.extraFrame.style.opacity = toggleOpacity(extraFrameInfo.extraFrame);
  }
  if (extraFrameInfo.animationType === "fade") {
    extraFrameInfo.extraFrame.animate("enable");
  }
}


export function showPrizeFish(frames, duration) {
  let prizeFish = whichFish(frames);

  temporaryToggleVisabilty(frames.star.image, duration)
  temporaryToggleVisabilty(prizeFish.image, duration)
}

function temporaryToggleVisabilty(frame, duration){
  toggleVisibility(frame);
  setTimeout(function () {
    toggleVisibility(frame);
  }, duration);
}



function disableButtonForAnimation(clickData, timeArray) {
  let sumTime = timeArray.reduce((runningTotal, currentInterartive) => runningTotal + currentInterartive, 0);

  clickData.forEach((clickableElement) => {
    clickableElement.button.removeEventListener("click", clickableElement.callback);

    setTimeout(function () {
      clickableElement.button.addEventListener("click", clickableElement.callback);
    }, sumTime);
  });
}

export function fadeElement(elements, from, to){

  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });

}

export function widgetAnimation(targetAnimation, time){
  targetAnimation.style.visibility = "visible"
  targetAnimation.animate("enable");

  if (typeof time === 'number') {
    setTimeout(function () {
      targetAnimation.style.visibility = "hidden"
      targetAnimation.animate("disable");
    }, time);
  }
}
