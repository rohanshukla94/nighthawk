const { getSdk } = require('balena-sdk');

const balena = getSdk({
    apiUrl: "https://api.balena-cloud.com/",
    dataDirectory: "/mnt/r/typescript/nighthawk/data"
});



balena.auth.loginWithToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIxMjEyLCJ1c2VybmFtZSI6Imdfcm9oYW5fZF9zaHVrbGEiLCJlbWFpbCI6InJkc2h1a2xhMTk5NEBnbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyMS0wOS0wNlQwOTowMjoxOS4wODJaIiwiand0X3NlY3JldCI6IjdCQ01NUDdYNk5ENzRKSjMzTURERkhHRVNYWTRCWEIzIiwiaGFzX2Rpc2FibGVkX25ld3NsZXR0ZXIiOnRydWUsImZpcnN0X25hbWUiOiJSb2hhbiIsImxhc3RfbmFtZSI6IlNodWtsYSIsImFjY291bnRfdHlwZSI6InByb2Zlc3Npb25hbCIsInNvY2lhbF9zZXJ2aWNlX2FjY291bnQiOlt7InByb3ZpZGVyIjoiZ29vZ2xlIiwiZGlzcGxheV9uYW1lIjoiUm9oYW4gRC4gU2h1a2xhIn1dLCJjb21wYW55IjoiQW5zY2VyIFJvYm90aWNzIiwiaGFzUGFzc3dvcmRTZXQiOnRydWUsInB1YmxpY19rZXkiOmZhbHNlLCJmZWF0dXJlcyI6W10sImludGVyY29tVXNlck5hbWUiOiJnX3JvaGFuX2Rfc2h1a2xhIiwiaW50ZXJjb21Vc2VySGFzaCI6IjIxNTM0ZTU1NDQ5ZTFhNjJlM2I2MDkyNGMyMDc4YWIxNzlkNzg5MzJhM2IwMjRiMzVlZmQ4NmFlNDE5ZjBlMjgiLCJwZXJtaXNzaW9ucyI6W10sImF1dGhUaW1lIjoxNjU3MDQ3MDk2MDQ4LCJpc192ZXJpZmllZCI6dHJ1ZSwibXVzdF9iZV92ZXJpZmllZCI6ZmFsc2UsImFjdG9yIjo3OTU4NDM4LCJpYXQiOjE2NTcwNDcwOTcsImV4cCI6MTY1NzY1MTg5N30.x8J8uhfHWV7PJYYl6Tf890-egcYYg0bNc_rldyO-zvc').then(function(error) {
if(error)throw error;
});

// balena.models.application.get('g_rohan_d_shukla/april_14').then(function(application) {
//     console.log(application);
// });



balena.models.device.getAll().then(function(devices) {
    console.log(devices);
});