//---IMPORTS---
//document
//----
//helper imports
//----
//system imports
//----
// local files imports
import * as alarmTimeButtons from './alarmTimeButtons.js'
import * as setUpAlarmTumbler from './setUpAlarmTumbler.js'
import * as snooze from './snooze.js'
//----
//external file imports
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

export function alarmBoot(mainSlime) {
  setUpAlarmTumbler.setupTumblerBoot()
  snooze.alarmSnoozeBoot();
  alarmTimeButtons.alarmTimeBoot();
}
