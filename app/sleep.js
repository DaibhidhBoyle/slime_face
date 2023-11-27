// import document from "document";
// import { BodyPresenceSensor } from "body-presence";
//
// export function sleepBoot(buttons, toggableHTMLElements) {
//   //   if (BodyPresenceSensor) {
//   //     console.log("This device has a BodyPresenceSensor!");
//   //     const bodyPresence = new BodyPresenceSensor();
//   //
//   //     // Function to check body presence state
//   //     function checkBodyPresence() {
//   //       console.log(`The device is ${bodyPresence.present ? '' : 'not'} on the user's body.`);
//   //     }
//   //
//   //     // Start the sensor
//   //     bodyPresence.start();
//   //
//   //     // Check body presence every minute (adjust interval as needed)
//   //
//   //     // Stop checking when needed (for example, when the app is paused)
//   //     // clearInterval(checkInterval);
//   //   } else {
//   //     console.log("This device does NOT have a BodyPresenceSensor!");
//   //   }
//   // }
//
//   console.log("flag1");
//   if (BodyPresenceSensor) {
//     console.log("flag2");
//     const bodyPresence = new BodyPresenceSensor();
//     let sleepSlime = document.getElementById("sleeping");
//     console.log("flag3");
//     const checkInterval = setInterval(checkBodyPresence, 1000);
//     bodyPresence.start();
//   } else {
//     console.log("No body sensor. No alteration to display.");
//   }
// }
//
// function sleepMode(sleepSlime, buttons, toggableHTMLElements){
//   sleepSlime.style.visibility = "visible";
//   buttons.forEach(button => {
//     button.style.visibility = "hidden"
//   });
//   toggableHTMLElements.forEach(element => {
//     element.style.visibility = "hidden"
//   });
// }
//
// function checkBodyPresence() {
//   console.log("flag4");
//   if (bodyPresence.present) {
//     console.log("flag5a");
//     // sleepMode(sleepSlime, buttons, toggableHTMLElements);
//   } else {
//     console.log("flag5b");
//     // Call function1 when not on the user's body
//     // function1();
//   }
// });

import document from "document";
import { BodyPresenceSensor } from "body-presence";

let bodyPresence;
let buttons2;
let elements;

export function sleepBoot(buttons, toggableHTMLElements) {
  buttons2 = [...buttons]
  elements = [...toggableHTMLElements]
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    const checkInterval = setInterval(checkBodyPresence, 1000);
    bodyPresence.start();
  } else {
    console.log("No body sensor. No alteration to display.");
  }
}

function checkBodyPresence() {
  let sleepSlime = document.getElementById("sleeping");
  if (bodyPresence && bodyPresence.present) {
    sleepMode(sleepSlime, buttons2, elements);
  } else {
    wakeMode(sleepSlime, buttons2, elements)
  }
}


function sleepMode(sleepSlime, buttons, toggableHTMLElements) {
  sleepSlime.style.visibility = "visible";
  buttons.forEach(button => {
   button.style.visibility = "hidden";
  });
  toggableHTMLElements.forEach(element => {
   element.style.visibility = "hidden";
  });
}

function wakeMode(sleepSlime, buttons, toggableHTMLElements) {
  sleepSlime.style.visibility = "hidden";
  buttons.forEach(button => {
   button.style.visibility = "visible";
  });
  
  toggableHTMLElements.forEach(element => {
   element.style.visibility = "hidden";
  });
}
