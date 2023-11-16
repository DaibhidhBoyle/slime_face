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


export function dateSuffixCreator(date) {
  let result = ""

  if (date > 3 && date < 21) {
    result = "th"
  };

  switch (date % 10) {
    case 1:
      result = "st";
    case 2:
      result = "nd";
    case 3:
      result = "rd";
    default:
      result = "th";

  return result
  }
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

export function toggleVisibilty(handle){
  let isVisible = handle.style.visibility === "visible";
  return isVisible ? "hidden" : "visible";
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
  return result;
}
