//---IMPORTS---
//document
//----
//helper imports
import * as components from '../../Helper/components.js'
import * as helper from '../../Helper/helper.js'
//----
//system imports
import userActivity from "user-activity";
import { battery } from "power";
//----
//local file imports
//--Infomatics
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

export function systemSetup(now){



  let batteryValue = battery.chargeLevel;
  components.batteryHandle.text = `${batteryValue} %`;

  let steps = (userActivity.today.adjusted["steps"] || 0);
  components.stepsHandle.text = helper.zeroPad(`${steps}`, 5);

}
