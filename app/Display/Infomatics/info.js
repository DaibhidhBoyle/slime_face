//---IMPORTS---
//document
//----
//helper imports
import * as helper from '../../Helper/helper.js'
//----
//system imports
//----
//local file imports
//--Infomatics
import * as timeInfo from './timeInfo.js'
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
  timeInfo.timeSetup()
}


export function toggleInfoElements(elements){
  elements.forEach(element => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
}
