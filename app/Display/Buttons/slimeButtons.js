//---IMPORTS---
//document
//----
//helper imports
import * as components from '../../Helper/components.js'
import * as helper from '../../Helper/helper.js'
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
import * as info from '../Infomatics/info.js'
//--Display
import * as animate from '../animations.js'
//----
//external file imports
import * as setUpAlarmTumbler from '../../Alarm/setUpAlarmTumbler.js'
import * as alarmTimeButtons from '../../Alarm/alarmTimeButtons.js'
import * as alarmDayButtons from '../../Alarm/alarmDayButtons.js'
//----
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
    components.timerButtonElements.children.forEach((timerButtonsElement) => {
      timerButtonsElement.style.visibility = helper.toggleVisibilty(timerButtonsElement)
    });
    components.colorButtonElements.children.forEach((colorButtonsElement) => {
      colorButtonsElement.style.visibility = helper.toggleVisibilty(colorButtonsElement)
    });
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
