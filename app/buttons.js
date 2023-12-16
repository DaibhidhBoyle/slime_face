import document from "document";
import * as info from './info.js'
import * as animate from './animations.js'
import * as mood from './mood.js'
import * as sleep from './sleep.js'
import * as helper from './helper.js'



export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []
  let mainSlime = document.getElementById("slime");
  let toggableHTMLElements = document.getElementsByClassName("HiddenOrVisible");

  buttonsAndCallBacksForEventListeners.push(slimeButton(mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...fishButton(mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButton(mainSlime, buttonsAndCallBacksForEventListeners));

  eventListenersHandler(buttonsAndCallBacksForEventListeners);

  return mainSlime
}




function slimeButton(mainSlime, toggableHTMLElements, clickData) {

  let jumpFrames = document.getElementsByClassName("jumpAnimation");

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

  if (mainSlime.image === "images/slimes/sleepSlime_1.png") {
    sleep.wakeMode(mainSlime, sleep.sleepBubble, sleep.animatedSleepElements);

    setInterval(() => {
      if (sleep.bodyPresence && !sleep.bodyPresence.present) {
        sleep.sleepMode(mainSlime, sleep.sleepBubble, sleep.animatedSleepElements);
      }
    }, 60 * 1000);
  }

  info.toggleInfoElements(elements);
  // 15 minutes passed to makeHappy
  mood.makeHappy(15 * 60 * 1000);
  animate.startButtonAnimation(slimeFrames, slimeTimes, clickData);
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
      fishWinFrames)
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
    mood.makeHappy(30 * 60 * 1000)

    animate.startButtonAnimation(eatFrames, eatFrameTimes, clickData);

    animate.widgetAnimation(prizeFoodAnimation, 2000);

  };



  function eventListenersHandler(listenersClickables){
    listenersClickables.forEach(listenersClickable => {
      eventListenerSetup(listenersClickable.button, listenersClickable.callback)
    });
  }

  function eventListenerSetup(button, callback){
    button.addEventListener("click", callback);
  }
