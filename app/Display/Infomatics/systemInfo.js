import * as helper from '../../Helper/helper.js'
import * as components from '../../Helper/components.js'

import { battery } from "power";
import userActivity from "user-activity";

export function systemSetup(now){



  let batteryValue = battery.chargeLevel;
  components.batteryHandle.text = `${batteryValue} %`;

  let steps = (userActivity.today.adjusted["steps"] || 0);
  components.stepsHandle.text = helper.zeroPad(`${steps}`, 5);

}
