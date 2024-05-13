import * as helper from '../../Helper/helper.js'
import * as info from '../info.js'
import * as setUpAlarmTumbler from '../../Alarm/setUpAlarmTumbler.js'
import * as alarmTimeButtons from '../../Alarm/alarmTimeButtons.js'
import * as alarmDayButtons from '../../Alarm/alarmDayButtons.js'
import * as animate from '../animations.js'
import * as components from '../../Helper/components.js'



let alarmElementListeners;

export function slimeButton(mainSlime, toggableHTMLElements, clickData) {

  let jumpFrames = components.jumpFramesUnaltered

  jumpFrames = [mainSlime, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), mainSlime];

  jumpFrames = helper.animationObjectify(jumpFrames);

  let jumpFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1700, 1000, 0];

  let slimeClick = () => {
    handleSlimeButtonClick(
      mainSlime,
      toggableHTMLElements,
      clickData,
      jumpFrames,
      jumpFrameTimes
    );
  };

  return {button: mainSlime, callback: slimeClick}
}


function handleSlimeButtonClick(mainSlime, elements, clickData, slimeFrames, slimeTimes) {


  if (components.slimeButtonState === 1){
    info.toggleInfoElements(elements);
  } else if (components.slimeButtonState === 2){
    let tumblerElements = setUpAlarmTumbler.bothTumblersIntoInformationDictionaries(components.tumblerHour, components.tumblerMin);
    alarmElementListeners = alarmTimeButtons.slimeButtonClickFunctionality(tumblerElements);
  } else if (components.slimeButtonState === 3){
    alarmDayButtons.sendToAlarm();
    alarmDayButtons.resetScreen();
    alarmDayButtons.resetAlarmElements(alarmElementListeners);
  }



  animate.startButtonAnimation(slimeFrames, slimeTimes, clickData);
}
