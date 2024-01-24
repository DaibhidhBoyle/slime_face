import * as info from './info.js'
import * as alarm from './alarm.js'
import * as buttons from './buttons.js'
import * as mood from './mood.js'
import * as sleep from './sleep.js'


boot();

function boot(){

  info.infomaticsBoot();
  alarm.alarmBoot();
  let allButtons = buttons.buttonsBoot();
  mood.moodBoot(allButtons.main);
  sleep.sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);

}
