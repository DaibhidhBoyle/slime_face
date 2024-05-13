import * as sleep from '../../Slime/sleep.js'
import * as components from '../../Helper/components.js'

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

  sleep.wakeMode(mainSlime, sleepSlime, components.sleepBubble, components.animateSleepElements);
  setTimeout(() => {
    if (sleep.bodyPresence && !sleep.bodyPresence.present) {
      sleep.sleepMode(mainSlime, sleepSlime, components.sleepBubble, components.animateSleepElements);
    }
  }, 60 * 1000);

}
