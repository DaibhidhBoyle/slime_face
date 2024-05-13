import * as sleep from '../Slime/sleep.js'

export function sleepButton(mainSlime, sleepSlime){

  let sleepClick = () => {
    handleSleepButtonClick(
      mainSlime,
      sleepSlime
    );
  };

  return {button: sleepSlime, callback: sleepClick}
}

function handleSleepButtonClick(mainSlime, sleepSlime){

  sleep.wakeMode(mainSlime, sleepSlime, sleep.sleepBubble, sleep.animateSleepElements);
  setTimeout(() => {
    if (sleep.bodyPresence && !sleep.bodyPresence.present) {
      sleep.sleepMode(mainSlime, sleepSlime, sleep.sleepBubble, sleep.animateSleepElements);
    }
  }, 60 * 1000);

}
