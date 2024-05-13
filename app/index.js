import * as info from './Display/info.js'
import * as alarm from './Alarm/alarm.js'
import * as setAlarm from './Alarm/setAlarm.js'
import * as buttons from './Display/Buttons/buttons.js'
import * as mood from './Slime/mood.js'
import * as sleep from './Slime/sleep.js'


boot();

function boot(){

  info.infomaticsBoot();
  let allButtons = buttons.buttonsBoot();
  alarm.alarmBoot(allButtons.main);
  mood.moodBoot(allButtons.main);
  sleep.sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);

}
