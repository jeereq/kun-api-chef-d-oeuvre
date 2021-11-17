const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const User = require("../../../models/user");
const Restaurant = require("../../../models/restaurant");
const Meal = require("../../../models/meal");

const { is_authenticate } = require("../../../utils/function");

const { restaurantType } = require("../../schemas");

module.exports = {
	restaurant: {
		type: restaurantType,
		args: {
			id: { type: GraphQLID }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return Restaurant.findById(args.id)
						.then((data) => {
							if (data !== null) return data;
							throw new Error(
								"restaurant non enregistrer sur notre plateforme !!!!"
							);
						})
						.catch((err) => {
							throw err;
						});
			}, request);
		}
	},

	restaurants: {
		type: new GraphQLList(restaurantType),
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) return Restaurant.find({ active: true });
			}, request);
		}
	},
	login_restaurant: {
		type: restaurantType,
		args: {
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parent, args) {
			return Restaurant.login(args);
		}
	}
};
