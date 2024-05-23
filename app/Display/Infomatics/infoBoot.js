//---IMPORTS---
//document
//----
//helper imports
import { heartrateHandle } from '../../Helper/components.js';
//----
//system imports
import { HeartRateSensor } from "heart-rate";

//----
//local file imports
//--Infomatics
import { timeBoot } from './timeInfo.js';
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

export function infomaticsBoot(){

  //set up time and system elements
  timeBoot()

  //grab heart rate from system
  let hrm = new HeartRateSensor();

  //update and display heart rate
  hrm.onreading = function() {
    heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();

}
