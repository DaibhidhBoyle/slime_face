export function timePrefrence (prefrence, hours){
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
