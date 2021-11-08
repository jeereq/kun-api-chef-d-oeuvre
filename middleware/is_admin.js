const User = require("../models/user");

module.exports = function (args) {
	return User.is_admin(args);
};
