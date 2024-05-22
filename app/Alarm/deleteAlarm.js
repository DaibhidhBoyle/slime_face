//---IMPORTS---
//document
//----
//helper imports
import { alarms } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
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

export function populateDeleteAlarmTumbler(tumblerElement) {
  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++) {
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i);
    let itemTextContainer = item.getElementById("text");

    if (alarms[i] !== undefined) {
      let dayIntitals = StringifyDaysInitials(alarms[i].days);
      itemTextContainer.text = alarms[i].time.concat("   ", dayIntitals);
      itemTextContainer.style.fontSize = 50;
    } else {
      itemTextContainer.text = "No Alarm Set";
    }
  }
}

export function StringifyDaysInitials(days) {
  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  let result = '';

  for (let i = 0; i < daysOfWeek.length; i++) {
    if (days.indexOf(daysOfWeek[i]) !== -1) {
      result += daysOfWeek[i][0] + ' ';
    } else {
      result += '. ';
    }
  }
  return result;
}
