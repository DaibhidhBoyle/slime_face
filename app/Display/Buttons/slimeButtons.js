//---IMPORTS---
//document
//----
//helper imports
import { jumpFramesUnaltered, timerButtonElements, colorButtonElements, tumblerHour, tumblerMin, slimeButtonState } from '../../Helper/components.js';
import { animationObjectify, toggleVisibilty } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
import { toggleInfoElements } from '../Infomatics/info'
//--Display
import { startButtonAnimation } from '../animations.js';
//----
//external file imports
import { getTumblersInfo } from '../../Alarm/setUpAlarmTumbler.js';
import { slimeButtonClickFunctionality } from '../../Alarm/alarmTimeButtons.js';
import { sendToAlarm, resetScreen, resetAlarmElements } from '../../Alarm/alarmDayButtons.js';
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
let alarmElementListeners;
//----
//main body

export function slimeButton(mainSlime, toggableHTMLElements, clickData) {
  let jumpFrames = setupJumpFrames(mainSlime);
  let jumpFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1700, 1000, 0]

  let slimeClick = () => {
    handleSlimeButtonClick(mainSlime, toggableHTMLElements, clickData, jumpFrames, jumpFrameTimes);
  };

  return { button: mainSlime, callback: slimeClick };
}

function setupJumpFrames(mainSlime) {
  let jumpFrames = jumpFramesUnaltered;
  jumpFrames = [mainSlime, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), mainSlime];
  jumpFrames = animationObjectify(jumpFrames);
  return jumpFrames;
}

function handleSlimeButtonClick(mainSlime, elements, clickData, slimeFrames, slimeTimes) {
  if (slimeButtonState === 1) {
    toggleInfoElements(elements);
    [...timerButtonElements.children, ...colorButtonElements.children].forEach((element) => {toggleVisibilty(element)});
  }

  if (slimeButtonState === 2) {
    let tumblerElements = getTumblersInfo(tumblerHour, tumblerMin);
    alarmElementListeners = slimeButtonClickFunctionality(tumblerElements);
  }

  if (slimeButtonState === 3) {
    sendToAlarm();
    resetScreen();
    resetAlarmElements(alarmElementListeners);
  }
  startButtonAnimation(slimeFrames, slimeTimes, clickData);
}
