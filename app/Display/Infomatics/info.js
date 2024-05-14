import * as timeInfo from './timeInfo.js'
import * as helper from '../../Helper/helper.js'

export function infomaticsBoot(now){
  timeInfo.timeSetup()
}


export function toggleInfoElements(elements){
  elements.forEach(element => {
    element.style.visibility = helper.toggleVisibilty(element);
  });
}
