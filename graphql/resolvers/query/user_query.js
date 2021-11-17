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

const { userType } = require("../../schemas");

const { is_authenticate } = require("../../../utils/function");

module.exports = {
	user: {
		type: userType,
		args: {
			id: { type: GraphQLID }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return User.findById(args.id).then((data) => {
						if (data) return data;
						throw new Error(
							"utilisateur non enregistrer sur notre plateforme !!!!"
						);
					});
			}, request);
		}
	},
	users: {
		type: new GraphQLList(userType),
		args: {
			authorisation: { type: GraphQLBoolean, default: false }
		},
		resolve(parent, { authorisation }, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) {
					let args = false;
					if (authorisation !== undefined) args = authorisation;
					return User.find({ authorisation: args });
				}
			}, request);
		}
	},

	login: {
		type: userType,
		args: {
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parent, args) {
			return User.login(args);
		}
	}
};
