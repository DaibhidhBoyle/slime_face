//---IMPORTS---
//document
//----
//helper imports
import { eat, foodAnimation, foodButtons } from '../../Helper/components.js';
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
import { startButtonAnimation, widgetAnimation } from '../animations.js';
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

export function foodButton(mainSlime, clickData) {
  let eatFrames = [
    mainSlime,
    eat,
    mainSlime,
    eat,
    mainSlime,
    eat,
    mainSlime
  ];

  eatFrames = animationObjectify(eatFrames);

  let eatFrameTimes = [0, 675, 400, 266, 400, 266, 0];

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
    foodButtonData.push({ button: foodButton, callback: foodClick });
  });

  return foodButtonData;
}

function handleFoodButtonClick(clickData, foodAnimation, eatFrames, eatFrameTimes) {
  let prizeFoodAnimation = foodAnimation[Math.floor(Math.random() * foodAnimation.length)];

  //30 minutes sent to be happy
  makeHappy(15 * 60 * 1000);

  startButtonAnimation(eatFrames, eatFrameTimes, clickData);

  widgetAnimation(prizeFoodAnimation, 2000);
}
