//---IMPORTS---
//document
//----
import document from "document";
//----
// helper imports
//----
import * as helper from '../Helper/helper.js'
import * as components from '../Helper/components.js'
//----
//system imports
//----
//local file imports
import * as alarmDayButtons from './alarmDayButtons.js'
import * as deleteAlarm from './deleteAlarm.js'
import * as setUpTumbler from './setUpAlarmTumbler.js'
//----
//external file imports
//----

//---EXPORTS---
//variables
export let alarmElements = [];
//----
//display elements
//----
//----

//---BODY---
//variables
let clockElements = []
let cornerButtons = []
//----
//main body










export function alarmTimeBoot(mainSlime) {

  setUpTumbler.setUpTumblerStyle(setUpTumbler.deleteTumblerElement, "No Alarm Set");

  setAlarmMode(setUpTumbler.tumblerElements, setUpTumbler.deleteTumblerElement, mainSlime);
  //import tumbler Elements
}

function setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime){
  let tumblers = Object.keys(tumblerElements).map(key => tumblerElements[key].tumbler);
  // grab elements for tumblers

  clockElements = [components.hourClock, components.minClock, components.clockColon];
  // elements for setting days

  // alarmElements = [...alarmDayGroup.children];
  //element for animating


  let infoChildrenText = components.infoGroup.getElementsByTagName("text")
  let infoChildrenImages = components.infoGroup.getElementsByTagName("image");
  let infoChildren = infoChildrenText.concat(infoChildrenImages);

  // set up event listener
  let clockButtonclick = () =>
  {
    components.tumblerColon.style.visibility = helper.toggleVisibilty(components.tumblerColon)

    tumblers.forEach((element) => {
      element.style.visibility = helper.toggleVisibilty(element);
    });

    infoChildren.forEach((element) => {
      element.style.pointerEvents = "none"
      element.style.visibility = "hidden";
    });

    helper.switchCornerButtons("hidden", "hidden", "visible");
    //helper

    components.setSlimeButtonState(2)
    //alarm

  }

  clockElements.forEach((clockElement) => {
    helper.eventListenerSetup(clockElement, clockButtonclick);
  });



  clockElements.push(components.dateClock)


}

export function slimeButtonClickFunctionality(tumblerElements){


  let arrayOfTumblerValues = []
  let arrayOfTumblerInfo = Object.keys(tumblerElements).map(key => tumblerElements[key]);
  arrayOfTumblerInfo.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value)
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`)
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });

  let arrayOfTumblers = arrayOfTumblerInfo.map(item => item.tumbler);

  let alarmSelectedTime = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`

  components.setSlimeButtonState(3)

  return slimeButtonClickSwitchToNextScreen(alarmSelectedTime, arrayOfTumblers)

}

function slimeButtonClickSwitchToNextScreen(time, arrayOfTumblers){
  arrayOfTumblers.forEach((element) => {
    element.style.visibility = helper.toggleVisibilty(element);
  });

  components.tumblerColon.style.visibility = helper.toggleVisibilty(components.tumblerColon);

  alarmElements.forEach((button) => {
    button.style.visibility = helper.toggleVisibilty(button);
  })

  helper.switchCornerButtons("hidden", "hidden", "hidden")

  return alarmDayButtons.setAlarmDays(time)
}
