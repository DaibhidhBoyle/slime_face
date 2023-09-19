import * as helper from './helper.js'

export async function visibilityAnimation(frames, times, callback) {
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

export function showPrizeFish(prizeFish){
  prizeFish.image.style.visibility = helper.toggleVisibilty(prizeFish.image);

  setTimeout(function() {
    prizeFish.image.style.visibility = helper.toggleVisibilty(prizeFish.image);
  }, 2500);
}
