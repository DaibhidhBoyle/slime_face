import * as info from './info.js'
import * as buttons from './buttons.js'
import * as sleep from './sleep.js'


boot();

function boot(){
  info.infomaticsBoot();
  let infoForSleep = buttons.buttonsBoot();
  sleep.sleepBoot(infoForSleep.allButtons, infoForSleep.elements);
}
