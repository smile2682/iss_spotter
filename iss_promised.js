const request = require('request-promise-native');

const fetchMyIP = function() {
  // console.log(request('https://api.ipify.org?format=json'))
  return request('https://api.ipify.org?format=json');
  // console.log(body)
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://freegeoip.app/json/${ip}`
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  // .then(body => console.log(body))
    .then(fetchCoordsByIP)
    // .then(url => console.log(request(url)))
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      console.log(response)
      return response;
     
    });
};

module.exports = { nextISSTimesForMyLocation };

