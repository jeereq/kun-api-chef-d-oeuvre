const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");

const { userType, restaurantType } = require("../schema");

module.exports = new GraphQLObjectType({
	name: "RootQuerytype",
	fields: {
		user: {
			type: userType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return User.findById(args.id)
					.then((data) => {
						if (data !== null) return data;
						throw new Error(
							"utilisateur non enregistrer sur notre plateforme !!!!"
						);
					})
					.catch((err) => {
						throw err;
					});
			}
		},
		users: {
			type: new GraphQLList(userType),
			args: {
				authorisation: { type: GraphQLBoolean, default: false }
			},
			resolve(parent, { authorisation }) {
				let args = false;
				if (authorisation !== undefined) args = authorisation;
				return User.find({ authorisation: args });
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
		},
		restaurant: {
			type: restaurantType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
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
			}
		},
		restaurants: {
			type: new GraphQLList(restaurantType),
			resolve(parent, args) {
				return Restaurant.find({ active: true });
			}
		},
		login_signup: {
			type: restaurantType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve() {
				return Restaurant.login(args);
			}
		}
	}
});
