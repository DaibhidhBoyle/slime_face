import * as helper from './helper.js';


export function startButtonAnimation(frames, timeFrames, clickData, secondaryAnimationTime = null, secondaryAnimationCallback = null, ) {
  if (typeof secondaryAnimationCallback === 'function') {
    visibilityAnimation(frames, timeFrames, secondaryAnimationCallback);
    timeFrames.push(secondaryAnimationTime);
    disableButtonForAnimation(clickData,  timeFrames);
  } else {
    disableButtonForAnimation(clickData, timeFrames);
    visibilityAnimation(frames, timeFrames);
  }
}

async function visibilityAnimation(frames, times, callback = null) {
  for (let i = 1; i < frames.length; i++) {
    frames[i].style.visibility = helper.toggleVisibilty(frames[i]);
    frames[i - 1].style.visibility = helper.toggleVisibilty(frames[i - 1]);
    await waitForNextFrame(times[i]);
    }
    if (typeof callback === 'function') {
      callback();
  }
}

function waitForNextFrame(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

export function showPrizeFish(frames, duration) {
  let prizeFish = helper.whichFish(frames);

  frames.star.image.style.visibility = helper.toggleVisibilty(frames.star.image);
  prizeFish.image.style.visibility = helper.toggleVisibilty(prizeFish.image);


  setTimeout(function () {
    frames.star.image.style.visibility = helper.toggleVisibilty(frames.star.image);
    prizeFish.image.style.visibility = helper.toggleVisibilty(prizeFish.image);
  }, duration);
}
