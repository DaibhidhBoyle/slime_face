//---IMPORTS---
//document
//----
import document from "document";
//----
//helper imports
//----
import * as components from '../Helper/components.js'
import * as helper from '../Helper/helper.js'
//----
//system imports
//----
//local file imports
//----
//external file imports
//----

//---EXPORTS---
//variables
export let deleteTumblerElement
export let tumblerElements;
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body





export function setupTumblerBoot(){


  tumblerElements = bothTumblersIntoInformationDictionaries(components.tumblerHour, components.tumblerMin);

  setUpTumblerStyle(tumblerElements["hour"]);
  setUpTumblerStyle(tumblerElements["min"]);

  deleteTumblerElement = {"tumbler": components.tumblerDelete, "itemIdPrefix": "delete-item", "numberOfItems": 14 }




}

export function setUpTumblerStyle(tumblerElement, baseTextValue){

  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++){
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i)

    let itemTextContainer = item.getElementById("text");

    if (baseTextValue === undefined){
      itemTextContainer.text = helper.zeroPad(`${i}`, 2)
      itemTextContainer.style.fontSize = 150
    }
    else{
      itemTextContainer.text = baseTextValue
      itemTextContainer.style.fontSize = 60
    }

    itemTextContainer.style.fontFamily = "Tungsten-Medium"

    itemTextContainer.style["fill"] = "#f887bd";

  }

}

export function bothTumblersIntoInformationDictionaries(tumblerHour, tumblerMin){
  return {"hour": { "tumbler": tumblerHour, "itemIdPrefix": "hour-item", "numberOfItems": 23 }, "min": {"tumbler": tumblerMin, "itemIdPrefix": "min-item", "numberOfItems": 59}}
};
