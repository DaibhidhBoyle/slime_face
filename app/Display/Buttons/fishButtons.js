//---IMPORTS---
//document
import document from "document"
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
//--Display
//----
//external file imports
import * as animate from '../animations.js'
//-
import * as mood from '../../Slime/mood.js'
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
