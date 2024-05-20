//---IMPORTS---
//document
//----
//helper imports
import * as components from '../../Helper/components.js'
import * as helper from '../../Helper/helper.js'
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import * as deleteAlarm from '../../Alarm/deleteAlarm.js'
import * as setUpAlarmTumbler from '../../Alarm/setUpAlarmTumbler.js'
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




  let deleteButtonClick = () =>
  {
    handleDeleteTumblerClick(
      mainSlime,
      baseDisplayElements
    );
  };

  let deleteButtonData = [];

  components.deleteAlarmButtons.forEach((deleteAlarmButton) => {
    deleteButtonData.push({ button: deleteAlarmButton, callback: deleteButtonClick });
  });

  return deleteButtonData;
};

function handleDeleteTumblerClick (mainSlime, baseDisplayElements){
  if (components.deleteButtonState === 1){
    components.tumblerColon.style.visibility = helper.toggleVisibilty(components.tumblerColon);
    components.tumblerHour.style.visibility = helper.toggleVisibilty(components.tumblerHour);
    components.tumblerMin.style.visibility = helper.toggleVisibilty(components.tumblerMin);

    mainSlime.style.visibility = helper.toggleVisibilty(mainSlime);

    deleteAlarm.populateDeleteAlarmTumbler(setUpAlarmTumbler.deleteTumblerElement);

    setUpAlarmTumbler.deleteTumblerElement['tumbler'].style.visibility = helper.toggleVisibilty(setUpAlarmTumbler.deleteTumblerElement['tumbler']);

    components.setdeleteButtonState(2)

  } else if (components.deleteButtonState === 2)
  {

    let deleteTumblerSelectedIndex = parseInt(setUpAlarmTumbler.deleteTumblerElement.tumbler.value);

    components.alarms.splice(deleteTumblerSelectedIndex, 1)

    deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements);

    setUpAlarmTumbler.setUpTumblerStyle(setUpAlarmTumbler.deleteTumblerElement, "No Alarm Set")

    components.setdeleteButtonState(1)
  }

}

function deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements){
  components.tumblerDelete.style.visibility = helper.toggleVisibilty(components.tumblerDelete);
  helper.switchCornerButtons("visible", "hidden");
  mainSlime.style.visibility = helper.toggleVisibilty(mainSlime);
  components.setSlimeButtonState(1)
  baseDisplayElements.forEach((  baseDisplayElement) => {
    baseDisplayElement.style.visibility = helper.toggleVisibilty(baseDisplayElement);
  });
}
