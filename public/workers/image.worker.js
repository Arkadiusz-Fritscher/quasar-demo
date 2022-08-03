importScripts("../src/api/db.js");

onmessage = function (message) {
  const locations = buildings;
  const files = message;

  console.log(message);
};
