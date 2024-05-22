//---IMPORTS---
//document
import document from "document";
//----
//helper imports
//----
//system imports
//----
//local file imports
//----
//external file imports
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

//utils

export function timePrefrence (preference, hours){
  if (preference === "12h") {
    return hours % 12 || 12;
  } else {
    return zeroPad(hours, 2);
  }
}

export function zeroPad(num, targetLength) {
  while (num.length < targetLength) {
    num = "0" + num
  }
  return num;
}


export function writtenDay(targetDay){
  let day = new Array();
  day[0] = "SUNDAY";
  day[1] = "MONDAY";
  day[2] = "TUESDAY";
  day[3] = "WEDNESDAY";
  day[4] = "THURSDAY";
  day[5] = "FRIDAY";
  day[6] = "SATURDAY";
  return day[targetDay]
}


export function dateSuffixCreator(date) {
  let result = ""

  if (date > 3 && date < 21) {
    result = "th"
  };


  switch (date % 10) {
    case 1:
    result = "st";
    break;
    case 2:
    result = "nd";
    break;
    case 3:
    result = "rd";
    break;
    default:
    result = "th";
    break;
  }

  return result
}

export function writtenMonth(targetMonth){
  let month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return month[targetMonth]
}

//helpers

export function animationObjectify(framesArray){
  let arrayOfObjects = []
  framesArray.forEach( animationFrame => {
    arrayOfObjects.push({frame: animationFrame})
  });
  return arrayOfObjects
}

//toggleVisibility
export function toggleVisibilty(handle){
  let isVisible = handle.style.visibility === "visible";
  handle.style.visibility = isVisible ? "hidden" : "visible";
}

export function toggleOpacity(handle){
  let currentOpacity = parseFloat(handle.style.opacity);
  let newSetting = 0

  if (isNaN(currentOpacity)) {
    newSetting = 1;
  } else {
    newSetting = currentOpacity === 0 ? 1 : 0;
  }

  return newSetting

}


export function whichFish(frames) {
  let randomPercentage =  Math.floor(Math.random() * 100) + 1
  let result = ""
  if (randomPercentage <= 10)
  {
    result = frames.boot;
  } else if (randomPercentage >= 11 && randomPercentage <= 50)
  {
    result = frames.anchovy;
  } else if (randomPercentage >= 51 && randomPercentage <= 75)
  {
    result = frames.bream;
  } else if (randomPercentage >= 76 && randomPercentage <= 95)
  {
    result = frames.crimson;
  } else if (randomPercentage >= 96)
  {
    result = frames.blobfish;
  }

  return result

}

export function switchCornerButtons(group1Visibilty, group2Visibilty, group3Visibilty) {

  let timerButtonElements = document.getElementById("timerButtons");
  let colorButtonElements = document.getElementById("colorSelectionButtons");
  let deleteButtonElements = document.getElementById("deleteButtons")

  timerButtonElements.children.forEach((timerButtonsElement) => {
    timerButtonsElement.style.visibility = group1Visibilty;
  });

  colorButtonElements.children.forEach((colorButtonsElement) => {
    colorButtonsElement.style.visibility = group2Visibilty;
  });

  deleteButtonElements.children.forEach((deleteButtonElement) => {
    deleteButtonElement.style.visibility = group3Visibilty;
  });

}

//event lsiteners

export function eventListenersHandler(listenersClickables, setUpOrRemoveFunction){
  listenersClickables.forEach(listenersClickable => {
    setUpOrRemoveFunction(listenersClickable.button, listenersClickable.callback)
  });
}

export function eventListenerSetup(button, callback){
  button.addEventListener("click", callback);
}

export function eventListenerRemoved(button, callback){
  button.removeEventListener("click", callback);
}
