import * as helper from '../../Helper/helper.js'
import * as components from '../../Helper/components.js'

import * as slimeButtons from './slimeButtons.js'
import * as sleepButtons from './sleepButtons.js'
import * as fishButtons from './fishButtons.js'
import * as foodButtons from './foodButtons.js'
import * as deleteButtons from './deleteButtons.js'



export function buttonsBoot(){
  let buttonsAndCallBacksForEventListeners = []

  let toggableHTMLElements = components.displayGroup.getElementsByTagName("text");
  toggableHTMLElements.push(...components.displayGroup.getElementsByTagName("image"))


  let baseDisplayElements = [...components.baseDisplayElements.children];

  buttonsAndCallBacksForEventListeners.push(slimeButtons.slimeButton(components.mainSlime, toggableHTMLElements, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(sleepButtons.sleepButton(components.mainSlime, components.sleepSlime));
  buttonsAndCallBacksForEventListeners.push(...fishButtons.fishButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...foodButtons.foodButton(components.mainSlime, buttonsAndCallBacksForEventListeners));
  buttonsAndCallBacksForEventListeners.push(...deleteButtons.deleteButton(components.mainSlime, components.deleteAlarmButtons, baseDisplayElements));

  helper.eventListenersHandler(buttonsAndCallBacksForEventListeners, helper.eventListenerSetup);

  return {main: components.mainSlime, sleep: components.sleepSlime, allButtonsAndCallbacks: buttonsAndCallBacksForEventListeners}
}
