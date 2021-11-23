const { GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');

const Restaurant = require('../../../models/restaurant');

const { userType, restaurantType } = require('../../schemas');

const { _NOT_ADMIN, _NOT_RESTAURANT } = require('../../../utils/constant');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	active_restaurant: {
		type: new GraphQLNonNull(userType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return await Restaurant.active(args);
			}, request);
		},
	},
	desactive_restaurant: {
		type: new GraphQLNonNull(userType),
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				return await Restaurant.desactive(id);
			}, request);
		},
	},
	desactive__restaurant_by_admin: {
		type: new GraphQLNonNull(userType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return Restaurant.desactive(args.id);
			}, request);
		},
	},
	signup_restaurant: {
		type: new GraphQLNonNull(restaurantType),
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) },
			phone_number: {
				type: new GraphQLNonNull(GraphQLString),
			},
			profil_image: {
				type: new GraphQLNonNull(GraphQLString),
			},
		},
		resolve(parent, args) {
			return Restaurant.signup(args);
		},
	},
	delete_restaurant: {
		type: new GraphQLNonNull(restaurantType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return await Restaurant.findByIdAndDelete(args.id).then((data) => {
					return data;
				});
			}, request);
		},
	},
};
