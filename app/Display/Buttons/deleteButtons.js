//---IMPORTS---
//document
//----
//helper imports
import { deleteAlarmButtons, tumblerColon, tumblerHour, tumblerMin, setdeleteButtonState, alarms, tumblerDelete, setSlimeButtonState, deleteButtonState } from '../../Helper/components.js';
import { toggleVisibility, toggleManyVisibility, switchCornerButtons, eventListenerSetup } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { populateDeleteAlarmTumbler } from '../../Alarm/deleteAlarm.js';
import { deleteTumblerElement, setUpTumblerStyle } from '../../Alarm/setUpAlarmTumbler.js';
//----
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

export function deleteButton(mainSlime, baseDisplayElements) {
  let deleteButtonClick = () => {
    handleDeleteTumblerClick(mainSlime, baseDisplayElements);
  };

  let deleteButtonData = deleteAlarmButtons.map(button => ({ button, callback: deleteButtonClick }));

  return deleteButtonData;
};

function handleDeleteTumblerClick(mainSlime, baseDisplayElements) {
  if (deleteButtonState === 1) {
    toggleManyVisibility([tumblerColon, tumblerHour, tumblerMin, mainSlime])

    populateDeleteAlarmTumbler(deleteTumblerElement);

    toggleVisibility(deleteTumblerElement['tumbler']);

    setdeleteButtonState(2);

  } else if (deleteButtonState === 2) {
    let deleteTumblerSelectedIndex = parseInt(deleteTumblerElement.tumbler.value);

    alarms.splice(deleteTumblerSelectedIndex, 1);

    deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements);

    setUpTumblerStyle(deleteTumblerElement, "No Alarm Set");

    setdeleteButtonState(1);
  }
}

function deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements) {

  [tumblerDelete, mainSlime, ...baseDisplayElements].forEach(element => toggleVisibility(element));

  switchCornerButtons("visible", "hidden", "hidden");
  setSlimeButtonState(1);

}
