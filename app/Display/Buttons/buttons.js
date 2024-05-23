//---IMPORTS---
//document
//----
//helper imports
import { displayGroup, baseDisplayElements, mainSlime, sleepSlime } from '../../Helper/components.js';
import { eventListenersHandler, eventListenerSetup } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
import { slimeButton } from './slimeButtons.js';
import { sleepButton } from './sleepButtons.js';
import { fishButton } from './fishButtons.js';
import { foodButton } from './foodButtons.js';
import { colorButton } from './colorButtons.js';
import { deleteButton } from './deleteButtons.js';
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

//establish buttons on base screen and corner buttons
export function buttonsBoot() {
  let buttonsAndCallBacksForEventListeners = [];
  //infomatics affected by button pushes
  let toggableHTMLElements = displayGroup;
  let baseDisplayElementsList = [...baseDisplayElements.children];

  // slime buttons
  buttonsAndCallBacksForEventListeners.push(slimeButton(mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(sleepButton(mainSlime, sleepSlime));
  //corner buttons
  buttonsAndCallBacksForEventListeners.push(...fishButton(mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButton(mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...colorButton(mainSlime, "left"));
  buttonsAndCallBacksForEventListeners.push(...colorButton(mainSlime, "right"));
  buttonsAndCallBacksForEventListeners.push(...deleteButton(mainSlime, baseDisplayElementsList));

  eventListenersHandler(buttonsAndCallBacksForEventListeners, eventListenerSetup);

  return { main: mainSlime, sleep: sleepSlime, allButtonsAndCallbacks: buttonsAndCallBacksForEventListeners };
}
