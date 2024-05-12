import document from "document";
import * as helper from '../Helper/helper.js'

export let slimeButtonState = 1

export function setSlimeButtonState(numberSetting){
  slimeButtonState = numberSetting;
}

export let alarms = [];

export let tumblerHour = document.getElementById("tumbler-hour");
export let tumblerMin = document.getElementById("tumbler-mins");
export let tumblerColon = document.getElementById("tumblerColon");

export let tumblerDelete = document.getElementById("tumbler-delete");


export let hourClock = document.getElementById("hourLabel");
export let minClock = document.getElementById("minuteLabel");
export let dateHandle = document.getElementById("dateLabel");
export let clockColon = document.getElementById("timeColon");

export let alarmDayGroup = document.getElementById("alarmDaySettings");

export let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements")
export let infoGroup = document.getElementById("displayElements");

export let date = document.getElementById("dateLabel");
export let alarmGroup = document.getElementById("snoozeGroup");
export let alarmState = [...alarmGroup.children];

export let plusButton = document.getElementById("plusButton");
export let minusButton = document.getElementById("minusButton");

export let mainSlime = document.getElementById("slime");
export let sleepSlime = document.getElementById("sleeping");
export let displayGroup = document.getElementById("displayElements");
export let deleteAlarmButtons = document.getElementsByClassName("deleteAlarmClickable");
export let baseDisplayElements = document.getElementById("displayElementsBaseView");

export let jumpFramesUnaltered = document.getElementsByClassName("jumpAnimation");


export let fishButtons = document.getElementsByClassName("fishClickable");
export let exclaimation = document.getElementById("exclaimation");

export let fishFramesUnaltered = document.getElementsByClassName("fishAnimation");



export let foodButtons = document.getElementsByClassName("foodClickable");
export let eat = document.getElementById("eating")

export let foodAnimation = document.getElementsByClassName("foodAnimation");

export let heartrateHandle = document.getElementById("heartrateLabel");

export let stepsHandle = document.getElementById("stepsLabel");
export let batteryHandle = document.getElementById("batteryLabel");

export let sleepBubble = document.getElementById("zzz");
export let animateSleepElements = document.getElementsByClassName("fadeDisplayElements");
