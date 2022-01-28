const User = require('../../../models/user');
const Restaurant = require('../../../models/restaurant');

const { statistiqueType, userType } = require('../../schemas');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	statistique: {
		type: statistiqueType,
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) {
					const usersLength = await User.find({ authorisation: false }).then(
						(data) => data.length
					);
					const banqueLength = await Restaurant.find({}).then(
						(data) => data.length
					);
					return {
						user: {},
						total: usersLength + banqueLength,
						restaurant: {},
						meal: {},
					};
				}
			}, request);
		},
	},
};
