import document from "document";

let moodMainSlime;
let timeTillSad;

export function moodBoot(slime) {
  moodMainSlime = slime
}

export function makeHappy(time){
  moodMainSlime.image  = "images/slimes/mainSlime_1.png"

  if (timeTillSad){
    clearTimeout(timeTillSad);
  }

  timeTillSad = setTimeout(() => makeSad(), time);
}

function makeSad(){
  moodMainSlime.image  = "images/slimes/sadSlime_1.png"
}
