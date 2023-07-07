export function toggleVisibilty(handle){
  let isVisible = handle.style.visibility === "visible";
  return isVisible ? "hidden" : "visible";
}
