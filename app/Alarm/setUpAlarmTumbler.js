//---IMPORTS---
//document
//----
import document from "document";
//----
//helper imports
//----
import { tumblerHour, tumblerMin, tumblerDelete } from '../Helper/components.js';
import { zeroPad } from '../Helper/helper.js';
//----
//system imports
//----
//local file imports
//----
//external file imports
//----

//---EXPORTS---
//variables
export let deleteTumblerElement;
export let tumblerElements;
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

export function setupTumblerBoot() {
  tumblerElements = getTumblersInfo(tumblerHour, tumblerMin);

  setUpTumblerStyle(tumblerElements["hour"]);
  setUpTumblerStyle(tumblerElements["min"]);

  deleteTumblerElement = { "tumbler": tumblerDelete, "itemIdPrefix": "delete-item", "numberOfItems": 14 };
}

export function setUpTumblerStyle(tumblerElement, baseTextValue) {
  for (let i = 0; i <= tumblerElement.numberOfItems; i++) {
    setupTumblerItem(tumblerElement, i, baseTextValue);
  }
}

function setupTumblerItem(tumblerElement, index, baseTextValue) {
  let item = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${index}`);
  let itemTextContainer = item.getElementById("text");

  itemTextContainer.text = baseTextValue ? baseTextValue : zeroPad(`${index}`, 2);
  itemTextContainer.style.fontSize = baseTextValue ? 60 : 150;

  styleTumblerItemText(itemTextContainer);
}

function styleTumblerItemText(textContainer) {
  textContainer.style.fontFamily = "Tungsten-Medium";
  textContainer.style.fill = "#f887bd";
}

export function getTumblersInfo(tumblerHour, tumblerMin) {
  return {
    hour: createTumblerElement(tumblerHour, "hour-item", 23),
    min: createTumblerElement(tumblerMin, "min-item", 59)
  };
}

function createTumblerElement(tumbler, itemIdPrefix, numberOfItems) {
  return { tumbler, itemIdPrefix, numberOfItems };
}
