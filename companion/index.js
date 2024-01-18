console.log("noted");

// import { me as companion } from "companion";
// import * as alarm from "../app/alarm.js"
//
// if (!companion.permissions.granted("run_background")) {
//   console.warn("We're not allowed to access to run in the background!");
// }
//
// const MILLISECONDS_PER_MINUTE = 1000 * 60;
//
// // Tell the Companion to wake after 30 minutes
// companion.wakeInterval = 5 * MILLISECONDS_PER_MINUTE;
//
// // Listen for the event
// companion.addEventListener("wakeinterval", doThis);
//
// // Event happens if the companion is launched and has been asleep
// if (companion.launchReasons.wokenUp) {
//   let alarminfo = doThis();
// // make this a then
// }
//
// function doThis() {
//   const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JMU0wiLCJzdWIiOiI5NVpZTUwiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNzA1NTI2MDA2LCJpYXQiOjE3MDU0OTcyMDZ9.Qmj3Ikm2HrwNXfRcZaZxsDk3lcSCEdrOrXE9NWD0Tuo"
//   let tracker = "";
//   let time = "";
//   let days = [];
//
//   return fetch('https://api.fitbit.com/1/user/-/devices.json', {
//     method: "GET",
//     headers: {"Authorization": "Bearer " + access_token}
//   })
//   .then(response => response.json())
//   .then(json => {
//     tracker = json[1].id
//
//     return fetch(`https://api.fitbit.com/1/user/-/devices/tracker/${tracker}/alarms.json`, {
//       method: "GET",
//       headers: {"Authorization": "Bearer " + access_token}
//     });
//   })
//   .then(response => response.json())
//   .then(trackerAlarms => {
//
//     time = trackerAlarms[1].time;
//     days = trackerAlarms[1].weekDays;
//
//     // Return the result
//     return {time: time, days: days};
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
//
// }
