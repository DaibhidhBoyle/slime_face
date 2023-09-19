export function toggleVisibilty(handle){
  let isVisible = handle.style.visibility === "visible";
  return isVisible ? "hidden" : "visible";
}

export function whichFish(frames) {
  let randomPercentage =  Math.floor(Math.random() * 101);
  let result = ""
  if (randomPercentage < 10)
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
