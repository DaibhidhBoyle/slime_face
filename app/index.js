import * as info from './info.js'
import * as buttons from './buttons.js'
import * as mood from './mood.js'
import * as sleep from './sleep.js'


boot();

function boot(){

  info.infomaticsBoot();
  let slimes = buttons.buttonsBoot();
  mood.moodBoot(slimes.main);
  sleep.sleepBoot(slimes.main, slimes.sleep);

}
