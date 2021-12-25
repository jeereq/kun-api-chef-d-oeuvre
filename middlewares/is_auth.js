const User = require('../models/user');
const Restaurant = require('../models/restaurant');

//constante à utiliser dans l'application

const {
	_USER,
	_ADMIN,
	_RESTAURANT,
	_NOT_USER,
	_NOT_ADMIN,
	_NOT_RESTAURANT,
} = require('../utils/constant');

module.exports = function (req, res, next) {
	const { token } = req.headers;

	const authentification = {
		is_user: false,
		is_admin: false,
		is_restaurant: false,
		is_auth: false,
		id: null,
	};

	Restaurant.is_restaurant(token)
		.then(({ type: [RESTAURANT], id }) => {
			if (RESTAURANT === _RESTAURANT) authentification.is_restaurant = true;

			if (RESTAURANT === _NOT_RESTAURANT)
				authentification.is_restaurant = RESTAURANT;

			authentification.id = id;

			return User.is_user(token);
		})
		.then(({ type: [USER, ADMIN], id }) => {
			if (ADMIN === _ADMIN) authentification.is_admin = true;

			if (USER === _USER) authentification.is_user = true;

			if (USER === _NOT_USER) authentification.is_user = USER;

			if (ADMIN === _NOT_ADMIN) authentification.is_admin = ADMIN;

			if (authentification.id === null) authentification.id = id;

			if (authentification.id !== null) authentification.is_auth = true;

			req.authentification = authentification;
			next();
		})
		.catch((err) => {
			authentification.is_user = err;
			authentification.is_admin = err;
			authentification.is_restaurant = err;

			req.authentification = authentification;
			next();
		});
};
