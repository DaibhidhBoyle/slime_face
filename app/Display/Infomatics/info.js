//---IMPORTS---
//document
//----
//helper imports
import { toggleVisibilty } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Infomatics
import { timeSetup } from './timeInfo.js';
//--Buttons
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

export function infomaticsBoot(now){
  timeSetup();
}

export function toggleInfoElements(elements){
  elements.forEach(element => {
    toggleVisibilty(element);
  });
}
