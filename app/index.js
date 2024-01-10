import * as info from './info.js'
import * as buttons from './buttons.js'
import * as mood from './mood.js'
import * as sleep from './sleep.js'


boot();

function boot(){

  info.infomaticsBoot();
  let allButtons = buttons.buttonsBoot();
  mood.moodBoot(allButtons.main);
  sleep.sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);

}
//
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Dynamic SVG Switching</title>
// </head>
// <body>
//
// <svg id="svg1" width="200" height="200" style="display: none;">
//     <!-- SVG content for the first SVG -->
//     <rect width="100%" height="100%" fill="blue"/>
//     <circle cx="100" cy="100" r="50" fill="white"/>
// </svg>
//
// <svg id="svg2" width="200" height="200" style="display: none;">
//     <!-- SVG content for the second SVG -->
//     <rect width="100%" height="100%" fill="green"/>
//     <ellipse cx="100" cy="100" rx="80" ry="50" fill="white"/>
// </svg>
//
// <button onclick="toggleSVGs()">Toggle SVGs</button>
// 
// <script>
//     function toggleSVGs() {
//         const svg1 = document.getElementById("svg1");
//         const svg2 = document.getElementById("svg2");
//
//         if (svg1.style.display === "none") {
//             svg1.style.display = "block";
//             svg2.style.display = "none";
//         } else {
//             svg1.style.display = "none";
//             svg2.style.display = "block";
//         }
//     }
// </script>
//
// </body>
// </html>
