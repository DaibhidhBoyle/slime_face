import document from "document";
import * as info from './info.js'
import * as animate from './animations.js'
import * as helper from './helper.js'



export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []
  let mainSlime = document.getElementById("slime");
  buttonsAndCallBacksForEventListeners.push(slimeButton(mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...fishButton(mainSlime, buttonsAndCallBacksForEventListeners));
  eventListenersHandler(buttonsAndCallBacksForEventListeners);
}




function slimeButton(mainSlime, clickData) {

  let toggableHTMLElements = document.getElementsByClassName("HiddenOrVisible");
  let jumpFrames = document.getElementsByClassName("jumpAnimation");

  jumpFrames = [mainSlime, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), mainSlime];
  let jumpFrameTimes = [75, 75, 75, 75, 75, 75, 75, 1700, 1000, 0];

  let slimeClick = () => {
    handleSlimeButtonClick(
      toggableHTMLElements,
      clickData,
      jumpFrames,
      jumpFrameTimes,
    );
  };

  return {button: mainSlime, callback: slimeClick}
}


function handleSlimeButtonClick(elements, clickData, slimeFrames, slimeTimes){
  info.toggleInfoElements(elements);
  animate.startButtonAnimation(clickData, slimeFrames, slimeTimes);
}




function fishButton(mainSlime, clickData) {
  let fishButtons = document.getElementsByClassName("fishClickable");

  let fishWinFrames = {
    star: { image: document.getElementById("star"), text: "star" },
    boot: { image: document.getElementById("boot"), text: "boot" },
    anchovy: { image: document.getElementById("anchovy"), text: "anchovy" },
    bream: { image: document.getElementById("bream"), text: "bream" },
    crimson: { image: document.getElementById("crimson"), text: "crimson" },
    blob: { image: document.getElementById("blobfish"), text: "blob" },
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

  let fishFrameTimes = [75, 75, 75, 75, 75, 75, 75, 1300, 500, 1200, 500, 1200, 1000, 0];

  let fishClick = () => {
    animate.startButtonAnimation(clickData, fishFrames, fishFrameTimes, () => {
      animate.showPrizeFish(fishWinFrames);
    });
  };

  let fishButtonData = [];

  fishButtons.forEach((fishButton) => {
    fishButtonData.push({ button: fishButton, callback: fishClick });
  });

  return fishButtonData;
}

function eventListenersHandler(listenersClickables){
  listenersClickables.forEach(listenersClickable => {
    eventListenerSetup(listenersClickable.button, listenersClickable.callback)
  });
}

function eventListenerSetup(button, callback){
  button.addEventListener("click", callback);
}
