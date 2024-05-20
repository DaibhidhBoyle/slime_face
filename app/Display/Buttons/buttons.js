//---IMPORTS---
//document
//----
//helper imports
import * as helper from '../../Helper/helper.js'
import * as components from '../../Helper/components.js'
//----
//system imports
//----
//local file imports
//--Buttons
import * as slimeButtons from './slimeButtons.js'
import * as sleepButtons from './sleepButtons.js'
import * as fishButtons from './fishButtons.js'
import * as foodButtons from './foodButtons.js'
import * as colorButtons from './colorButtons.js'
import * as deleteButtons from './deleteButtons.js'
//--Infomatics
//--Display
//----
//external file imports
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



export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []

  let toggableHTMLElements = components.displayGroup.getElementsByTagName("text");
  toggableHTMLElements.push(...components.displayGroup.getElementsByTagName("image"))


  let baseDisplayElements = [...components.baseDisplayElements.children];

  buttonsAndCallBacksForEventListeners.push(slimeButtons.slimeButton(components.mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(sleepButtons.sleepButton(components.mainSlime, components.sleepSlime));
  buttonsAndCallBacksForEventListeners.push(...fishButtons.fishButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButtons.foodButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...colorButtons.colorButton(components.mainSlime, "left"));
  buttonsAndCallBacksForEventListeners.push(...colorButtons.colorButton(components.mainSlime, "right"));
  buttonsAndCallBacksForEventListeners.push(...deleteButtons.deleteButton(components.mainSlime, baseDisplayElements));

  helper.eventListenersHandler(buttonsAndCallBacksForEventListeners, helper.eventListenerSetup);

  return {main: components.mainSlime, sleep: components.sleepSlime, allButtonsAndCallbacks: buttonsAndCallBacksForEventListeners}
}
