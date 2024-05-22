//---IMPORTS---
//document
import document from "document"
//----
//helper imports
import { fishFramesUnaltered, exclaimation, fishButtons } from '../../Helper/components.js';
import { animationObjectify } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { startButtonAnimation, showPrizeFish } from '../animations.js';
import { makeHappy } from '../../Slime/mood.js';
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
//----
//main body

export function fishButton(mainSlime, clickData) {
  let fishWinFrames = createFishWinFrames();
  let fishFrames = setupFishFrames(mainSlime);

  let fishFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1300, 500, 1200, 500, 1200, 1000, 0];

  let secondaryAnimationTime = 2500;

  let fishClick = () => {
    handleFishButtonClick(
      fishFrames,
      fishFrameTimes,
      clickData,
      secondaryAnimationTime,
      fishWinFrames
    );
  };

  let fishButtonData = fishButtons.map(button => ({ button, callback: fishClick }));

  return fishButtonData;
}

function createFishWinFrames() {
  return {
    star: { image: document.getElementById("star"), text: "star" },
    boot: { image: document.getElementById("boot"), text: "boot" },
    anchovy: { image: document.getElementById("anchovy"), text: "anchovy" },
    bream: { image: document.getElementById("bream"), text: "bream" },
    crimson: { image: document.getElementById("crimson"), text: "crimson" },
    blobfish: { image: document.getElementById("blobfish"), text: "blob" },
  };
}

function setupFishFrames(mainSlime) {
  let fishFrames = fishFramesUnaltered;
  fishFrames = [mainSlime, ...fishFrames, fishFrames[6], fishFrames[7], fishFrames[6], fishFrames[7], mainSlime];
  fishFrames = animationObjectify(fishFrames);

  fishFrames[8].extraFrame = { extraFrame: exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes" };
  fishFrames[10].extraFrame = { extraFrame: exclaimation, animationType: "fade", maxOpacity: 0.6, text: "yes" };
  fishFrames[12].extraFrame = { extraFrame: exclaimation, animationType: "snap", maxOpacity: 0.95, text: "yes" };

  return fishFrames;
}

function handleFishButtonClick(fishFrames, fishFrameTimes, clickData, secondaryAnimationTime, fishWinFrames) {
  // 1 hour passed to makeHappy
  makeHappy(60 * 60 * 1000);
  startButtonAnimation(fishFrames, fishFrameTimes, clickData, secondaryAnimationTime, () => {
    showPrizeFish(fishWinFrames, secondaryAnimationTime);
  });
}
