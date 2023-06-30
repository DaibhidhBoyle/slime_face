export function timePrefrence (preference, hours){
  if (preference === "12h") {
    return hours % 12 || 12;
  } else {
    return zeroPad(hours);
  }
}

export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let suffix = utils.dateSuffixCreator(date);
let writtenMonth = utils.writtenMonth(month);

export function dateSuffixCreator(date) {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function utils.writtenMonth {
  

}
