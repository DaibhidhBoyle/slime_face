//---IMPORTS---
//document
//----
//helper imports
import { deleteAlarmButtons, tumblerColon, tumblerHour, tumblerMin, setdeleteButtonState, alarms, tumblerDelete, setSlimeButtonState, deleteButtonState } from '../../Helper/components.js';
import { toggleVisibilty, switchCornerButtons, eventListenerSetup } from '../../Helper/helper.js';
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

  let deleteButtonData = [];

  deleteAlarmButtons.forEach((deleteAlarmButton) => {
    deleteButtonData.push({ button: deleteAlarmButton, callback: deleteButtonClick });
  });

  return deleteButtonData;
};

function handleDeleteTumblerClick(mainSlime, baseDisplayElements) {
  if (deleteButtonState === 1) {
    tumblerColon.style.visibility = toggleVisibilty(tumblerColon);
    tumblerHour.style.visibility = toggleVisibilty(tumblerHour);
    tumblerMin.style.visibility = toggleVisibilty(tumblerMin);

    mainSlime.style.visibility = toggleVisibilty(mainSlime);

    populateDeleteAlarmTumbler(deleteTumblerElement);

    deleteTumblerElement['tumbler'].style.visibility = toggleVisibilty(deleteTumblerElement['tumbler']);

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
  tumblerDelete.style.visibility = toggleVisibilty(tumblerDelete);
  switchCornerButtons("visible", "hidden", "hidden");
  mainSlime.style.visibility = toggleVisibilty(mainSlime);
  setSlimeButtonState(1);
  baseDisplayElements.forEach((baseDisplayElement) => {
    baseDisplayElement.style.visibility = toggleVisibilty(baseDisplayElement);
  });
}
