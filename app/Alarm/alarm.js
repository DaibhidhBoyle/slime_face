import * as snooze from './snooze.js'
import * as alarmTimeButtons from './alarmTimeButtons.js'
import * as setUpAlarmTumbler from './setUpAlarmTumbler.js'


export function alarmBoot(mainSlime) {
  setUpAlarmTumbler.setupTumblerBoot()
  snooze.alarmSnoozeBoot();
  alarmTimeButtons.alarmTimeBoot();
}
