import document from "document";
import * as info from './info.js'
import * as alarm from './alarm.js'
import * as setAlarm from './setAlarm.js'
import * as animate from './animations.js'
import * as mood from './mood.js'
import * as sleep from './sleep.js'
import * as helper from './helper.js'



export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []
  let mainSlime = document.getElementById("slime");
  let sleepSlime = document.getElementById("sleeping");
  let displayGroup = document.getElementById("displayElements");
  let toggableHTMLElements = displayGroup.getElementsByTagName("text");
  toggableHTMLElements.push(...displayGroup.getElementsByTagName("image"))

  buttonsAndCallBacksForEventListeners.push(slimeButton(mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(sleepButton(mainSlime, sleepSlime));
  buttonsAndCallBacksForEventListeners.push(...fishButton(mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButton(mainSlime, buttonsAndCallBacksForEventListeners));

  helper.eventListenersHandler(buttonsAndCallBacksForEventListeners, helper.eventListenerSetup);

  return {main: mainSlime, sleep: sleepSlime, allButtonsAndCallbacks: buttonsAndCallBacksForEventListeners}
}




function slimeButton(mainSlime, toggableHTMLElements, clickData) {

  let jumpFrames = document.getElementsByClassName("jumpAnimation");

  jumpFrames = [mainSlime, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), mainSlime];

  jumpFrames = helper.animationObjectify(jumpFrames);

  let jumpFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1700, 1000, 0];

  // let flag = new Boolean(true)

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

  if (setAlarm.tumblerHour.style.visibility !== "visible" && setAlarm.tumblerMin.style.visibility !== "visible"){
    info.toggleInfoElements(elements);
  } else {
    let tumblerElements = setAlarm.bothTumblersIntoInformationDictionaries(setAlarm.tumblerHour, setAlarm.tumblerMin);
    setAlarm.slimeButtonClickFunctionality(tumblerElements);
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

  let fishButtons = document.getElementsByClassName("fishClickable");
  let exclaimation = document.getElementById("exclaimation");

  let fishWinFrames = {
    star: { image: document.getElementById("star"), text: "star" },
    boot: { image: document.getElementById("boot"), text: "boot" },
    anchovy: { image: document.getElementById("anchovy"), text: "anchovy" },
    bream: { image: document.getElementById("bream"), text: "bream" },
    crimson: { image: document.getElementById("crimson"), text: "crimson" },
    blobfish: { image: document.getElementById("blobfish"), text: "blob" },
  };

  let fishFrames = document.getElementsByClassName("fishAnimation");

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

  fishFrames[8].extraFrame = {extraFrame: exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes"}
  fishFrames[10].extraFrame = {extraFrame: exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes"}
  fishFrames[12].extraFrame = {extraFrame: exclaimation, animationType: "snap", maxOpacity: 0.95, text: "yes"}

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

  fishButtons.forEach((fishButton) => {
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
  let foodButtons = document.getElementsByClassName("foodClickable");

  let eat = document.getElementById("eating")

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

  let foodAnimation = document.getElementsByClassName("foodAnimation");

  let foodClick = () => {
    handleFoodButtonClick(
      clickData,
      foodAnimation,
      eatFrames,
      eatFrameTimes
    );
  };


  let foodButtonData = [];

  foodButtons.forEach((foodButton) => {
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
