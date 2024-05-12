import document from "document";
import * as info from './info.js'
import * as alarm from '../Alarm/alarm.js'
import * as setUpAlarmTumbler from '../Alarm/setUpAlarmTumbler.js'
import * as alarmTimeButtons from '../Alarm/alarmTimeButtons.js'
import * as alarmDayButtons from '../Alarm/alarmDayButtons.js'
import * as deleteAlarm from '../Alarm/deleteAlarm.js'
import * as animate from './animations.js'
import * as mood from '../Slime/mood.js'
import * as sleep from '../Slime/sleep.js'
import * as helper from '../Helper/helper.js'
import * as components from '../Helper/components.js'

let alarmElementListeners;
let deleteButtonState = 1


export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []

  let toggableHTMLElements = components.displayGroup.getElementsByTagName("text");
  toggableHTMLElements.push(...components.displayGroup.getElementsByTagName("image"))


  let baseDisplayElements = [...components.baseDisplayElements.children];

  buttonsAndCallBacksForEventListeners.push(slimeButton(components.mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(sleepButton(components.mainSlime, components.sleepSlime));
  buttonsAndCallBacksForEventListeners.push(...fishButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...deleteButton(components.mainSlime, components.deleteAlarmButtons, baseDisplayElements));

  helper.eventListenersHandler(buttonsAndCallBacksForEventListeners, helper.eventListenerSetup);

  return {main: components.mainSlime, sleep: components.sleepSlime, allButtonsAndCallbacks: buttonsAndCallBacksForEventListeners}
}




function slimeButton(mainSlime, toggableHTMLElements, clickData) {

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

function sleepButton(mainSlime, sleepSlime){

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


function fishButton(mainSlime, clickData) {

  let fishFrames = components.fishFramesUnaltered

  fishFrames = [
    mainSlime,
    ...fishFrames,
    fishFrames[6],
    fishFrames[7],
    fishFrames[6],
    fishFrames[7],
    mainSlime,
  ];

  fishFrames = helper.animationObjectify(fishFrames)

  let fishWinFrames = {
    star: { image: document.getElementById("star"), text: "star" },
    boot: { image: document.getElementById("boot"), text: "boot" },
    anchovy: { image: document.getElementById("anchovy"), text: "anchovy" },
    bream: { image: document.getElementById("bream"), text: "bream" },
    crimson: { image: document.getElementById("crimson"), text: "crimson" },
    blobfish: { image: document.getElementById("blobfish"), text: "blob" },
  };


  fishFrames[8].extraFrame = {extraFrame: components.exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes"}
  fishFrames[10].extraFrame = {extraFrame: components.exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes"}
  fishFrames[12].extraFrame = {extraFrame: components.exclaimation, animationType: "snap", maxOpacity: 0.95, text: "yes"}

  let fishFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1300, 500, 1200, 500, 1200, 1000, 0];

  let secondaryAnimationTime = 2500

  let fishClick = () => {
    handleFishButtonClick(
      fishFrames,
      fishFrameTimes,
      clickData,
      secondaryAnimationTime,
      fishWinFrames
    )
  };

  let fishButtonData = [];

  components.fishButtons.forEach((fishButton) => {
    fishButtonData.push({ button: fishButton, callback: fishClick });
  });

  return fishButtonData;

}

function handleFishButtonClick(fishFrames, fishFrameTimes, clickData, secondaryAnimationTime, fishWinFrames){
  // 1 hour passed to makeHappy
  mood.makeHappy(60 * 60 * 1000)
  animate.startButtonAnimation(fishFrames, fishFrameTimes, clickData, secondaryAnimationTime, () => {
    animate.showPrizeFish(fishWinFrames, secondaryAnimationTime);
  });
}


function foodButton(mainSlime, clickData) {

  let eat = components.eat

  let eatFrames = [
    mainSlime,
    eat,
    mainSlime,
    eat,
    mainSlime,
    eat,
    mainSlime
  ];

  eatFrames = helper.animationObjectify(eatFrames)

  let eatFrameTimes = [0, 675, 400, 266, 400, 266, 0];



  let foodClick = () => {
    handleFoodButtonClick(
      clickData,
      components.foodAnimation,
      eatFrames,
      eatFrameTimes
    );
  };


  let foodButtonData = [];

  components. foodButtons.forEach((foodButton) => {
    foodButtonData.push({ button: foodButton, callback: foodClick});
  });

  return foodButtonData;
}


function handleFoodButtonClick(clickData, foodAnimation, eatFrames, eatFrameTimes){
  let prizeFoodAnimation = foodAnimation[Math.floor(Math.random() * foodAnimation.length)];

  //30 mintues sent to be happy
  mood.makeHappy(15* 60 * 1000);

  animate.startButtonAnimation(eatFrames, eatFrameTimes, clickData);

  animate.widgetAnimation(prizeFoodAnimation, 2000);

};


function deleteButton(mainSlime, deleteAlarmButtons, baseDisplayElements) {




  let deleteButtonClick = () =>
  {
    handleDeleteTumblerClick(
      mainSlime,
      baseDisplayElements
    );
  };

  let deleteButtonData = [];

  deleteAlarmButtons.forEach((deleteAlarmButton) => {
    deleteButtonData.push({ button: deleteAlarmButton, callback: deleteButtonClick });
  });

  return deleteButtonData;
};

function handleDeleteTumblerClick (mainSlime, baseDisplayElements){
  console.log(deleteButtonState);
  if (deleteButtonState === 1){
    console.log("yip yip appa");
    components.tumblerColon.style.visibility = helper.toggleVisibilty(components.tumblerColon);
    components.tumblerHour.style.visibility = helper.toggleVisibilty(components.tumblerHour);
    components.tumblerMin.style.visibility = helper.toggleVisibilty(components.tumblerMin);

    mainSlime.style.visibility = helper.toggleVisibilty(mainSlime);

    deleteAlarm.populateDeleteAlarmTumbler(setUpAlarmTumbler.deleteTumblerElement);

    setUpAlarmTumbler.deleteTumblerElement['tumbler'].style.visibility = helper.toggleVisibilty(setUpAlarmTumbler.deleteTumblerElement['tumbler']);

    deleteButtonState = 2

    console.log(deleteButtonState);
  } else if (deleteButtonState === 2)
  {

    console.log("yup");
    let deleteTumblerSelectedIndex = parseInt(setUpAlarmTumbler.deleteTumblerElement.tumbler.value);

    components.alarms.splice(deleteTumblerSelectedIndex, 1)

    deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements);

    deleteButtonState = 1
  }

}

function deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements){
  components.tumblerDelete.style.visibility = helper.toggleVisibilty(components.tumblerDelete);
  helper.switchCornerButtons("visible", "hidden");
  mainSlime.style.visibility = helper.toggleVisibilty(mainSlime);
  baseDisplayElements.forEach((  baseDisplayElement) => {
    baseDisplayElement.style.visibility = helper.toggleVisibilty(baseDisplayElement);
  });
}
