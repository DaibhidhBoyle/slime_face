import * as components from '../Helper/components.js'
import * as helper from '../Helper/helper.js'
import * as mood from '../Slime/mood.js'
import * as animate from './animations.js'


export function foodButton(mainSlime, clickData) {

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
