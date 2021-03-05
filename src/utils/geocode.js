const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXJ2ZXVzIiwiYSI6ImNrbHV5MW42cTA5dnUydnBiZmQyNTYxNDIifQ.Id9sgue9pNF4T2z3e8OImA&limit=1";

  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the geocoding service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search.", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
