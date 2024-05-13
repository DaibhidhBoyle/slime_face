import * as components from '../Helper/components.js'

export function populateDeleteAlarmTumbler(tumblerElement){

  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++){
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i)

    let itemTextContainer = item.getElementById("text");

    if (components.alarms[i] !== undefined){

      let dayIntitals = StringifyDaysInitials(components.alarms[i].days)
      let alarmText = components.alarms[i].time.concat("   ", dayIntitals)
      itemTextContainer.style.fontSize = 50

    } else {
      let alarmText = "No Alarm Set"
    }

    itemTextContainer.text = alarmText



  }

}

export function StringifyDaysInitials(days) {
  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']; // Full names of each day

    let result = '';
    for (let i = 0; i < daysOfWeek.length; i++) {
        if (days.indexOf(daysOfWeek[i]) !== -1) {
            result += daysOfWeek[i][0] + ' '; // Add first letter if present in the array
        } else {
            result += '. '; // Add a blank space if not present
        }
    }
    return result
}
