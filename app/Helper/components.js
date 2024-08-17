//---IMPORTS---
//document
import document from "document"
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
export let slimeButtonState = 1 //setter function below
export let deleteButtonState = 1 //setter function below
//-
export let alarms = [];
//----
//display elements
//slime elements
export let mainSlime = document.getElementById("slime");
export let sleepSlime = document.getElementById("sleeping");
export let eat = document.getElementById("eating")
//button getElements
export let fishButtons = document.getElementsByClassName("fishClickable");
export let foodButtons = document.getElementsByClassName("foodClickable");
export let leftColorButtons = document.getElementsByClassName("leftColorClickable");
export let rightColorButtons = document.getElementsByClassName("rightColorClickable");
export let deleteAlarmButtons = document.getElementsByClassName("deleteAlarmClickable");
//-
export let plusButton = document.getElementById("plusButton");
export let minusButton = document.getElementById("minusButton");
//aniamte elements
export let jumpFramesUnaltered = document.getElementsByClassName("jumpAnimation");
export let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements")
export let sleepBubble = document.getElementById("zzz");
export let fishFramesUnaltered = document.getElementsByClassName("fishAnimation");
export let foodAnimation = document.getElementsByClassName("foodAnimation");
export let exclaimation = document.getElementById("exclaimation");
//informatics
//system elements
export let heartrateHandle = document.getElementById("heartrateLabel");
export let stepsHandle = document.getElementById("stepsLabel");
export let batteryHandle = document.getElementById("batteryLabel");
// time elements
export let hourClock = document.getElementById("hourLabel");
export let minClock = document.getElementById("minuteLabel");
export let dateClock = document.getElementById("dateLabel");
export let clockColon = document.getElementById("timeColon");
//-
// tumblers
export let tumblerHour = document.getElementById("tumbler-hour");
export let tumblerMin = document.getElementById("tumbler-mins");
export let tumblerColon = document.getElementById("tumblerColon");
//-
export let tumblerDelete = document.getElementById("tumbler-delete");
//groups
export let alarmDayGroup = document.getElementById("alarmDaySettings");
export let alarmGroup = document.getElementById("snoozeGroup");
export let alarmState = [...alarmGroup.children];
export let displayGroup = document.getElementsByClassName("displayElement");
export let baseDisplayElements = document.getElementsByClassName("displayElementsBaseView"); // to avoid animate elements grab .children on import
//-
export let timerButtonElements = document.getElementsByClassName("timerButtons"); // to avoid animate elements grab .children on import
export let colorButtonElements = document.getElementsByClassName("colorSelectionButtons"); // to avoid animate elements grab .chidlren on import
export let deleteButtonElements = document.getElementsByClassName("deleteButtons") // to avoid animate elements grab .children on import
//----
//----

//---BODY---
//variables
//----
//main body



export function setSlimeButtonState(numberSetting){
  slimeButtonState = numberSetting;
}

export function setdeleteButtonState(numberSetting){
  deleteButtonState = numberSetting;
}
