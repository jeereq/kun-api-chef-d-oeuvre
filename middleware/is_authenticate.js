const Restaurant = require("../models/restaurant");

module.exports = function (args) {
	return Restaurant.restaurant_exist(args);
};
