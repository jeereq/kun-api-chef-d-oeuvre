const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");

const { userType, restaurantType, localisationType } = require("../schema");

const is_admin = require("../../middleware/is_admin");

module.exports = new GraphQLObjectType({
	name: "RootMutationType",
	fields: {
		restaurant_update: {
			type: restaurantType,
			args: {
				id: { type: GraphQLID },
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				phone_number: { type: GraphQLString },
				profil_image: { type: GraphQLString }
			},
			resolve(parent, args) {
				return Restaurant.findByIdAndUpdate(args.id, { ...args })
					.then((data) => {
						if (data !== null) return { ...data };
						throw new Error(
							"restaurant non enregistrer sur notre plateforme !!!!"
						);
					})
					.catch((err) => {
						throw err;
					});
			}
		},
		signup: {
			type: new GraphQLNonNull(userType),
			args: {
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				phone_number: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorisation: {
					type: GraphQLBoolean
				}
			},
			resolve(parent, args) {
				return User.signup(args);
			}
		},
		signup_restaurant: {
			type: new GraphQLNonNull(restaurantType),
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				phone_number: {
					type: new GraphQLNonNull(GraphQLString)
				},
				profil_image: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, args) {
				return Restaurant.signup(args);
			}
		},
		delete_restaurant: {
			type: new GraphQLNonNull(restaurantType),
			args: {
				token: {
					type: new GraphQLNonNull(GraphQLString)
				},
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				is_admin(args)
					.then(async (res) => {
						if (res) {
							return await Restaurant.findByIdAndDelete(args.id).then(
								(data) => {
									return data;
								}
							);
						} else
							throw new Error(
								"vous n'etes pas authoriser à supprimer un utilisateur !!!"
							);
					})
					.catch((err) => {
						throw err;
					});
			}
		},
		delete_user: {
			type: new GraphQLNonNull(userType),
			args: {
				token: {
					type: new GraphQLNonNull(GraphQLString)
				},
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				is_admin(args)
					.then(async (res) => {
						if (res) {
							return await User.findByIdAndDelete(args.id).then((data) => {
								return data;
							});
						} else
							throw new Error(
								"vous n'etes pas authoriser à supprimer un utilisateur !!!"
							);
					})
					.catch((err) => {
						throw err;
					});
			}
		}
	}
});
