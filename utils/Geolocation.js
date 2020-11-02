const NodeGeocoder = require("node-geocoder");
const options = {
  provider: "mapquest",
  // Optional depending on the providers
  httpAdapter: "https",
  apiKey: "iDXDlsR0lSNvxgBYSAthfVetGThtCsos",
  formatter: null,
};
const geocoder = NodeGeocoder(options);

module.exports = geocoder;
