// const {
// 	GraphQLString,
// 	GraphQLID,
// 	GraphQLList,
// 	GraphQLNonNull,
// 	GraphQLBoolean,
// } = require('graphql');

const User = require('../../../models/user');
const Restaurant = require('../../../models/restaurant');

const { statistiqueType } = require('../../schemas');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	statistique: {
		type: statistiqueType,
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return {
						user: {},
						total:
							(await User.find({ authorisation: false }).then(
								(data) => data.length
							)) + (await Restaurant.find({}).then((data) => data.length)),
						restaurant: {},
						meal: {},
					};
			}, request);
		},
	},
};
