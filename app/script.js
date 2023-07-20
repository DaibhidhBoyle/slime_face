export function toggleVisibilty(handle){
  let isVisible = handle.style.visibility === "visible";
  return isVisible ? "hidden" : "visible";
}

export function imageLinkConstructor(name, folder){
  return `images/${folder}/${name}.png`
}
