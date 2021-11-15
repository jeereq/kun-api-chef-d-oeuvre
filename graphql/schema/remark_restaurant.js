const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const restaurantType = require("./restaurant");
const userType = require("./user");

const Restaurant = require("../../models/restaurant");
const User = require("../../models/user");

module.exports = new GraphQLObjectType({
	name: "remarkRestaurant",
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.user_id);
			}
		},
		restaurant_id: {
			type: restaurantType,
			resolve(parent) {
				return Restaurant.findById(parent.restaurant_id);
			}
		},
		message: {
			type: new GraphQLNonNull(GraphQLString)
		},
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString }
	})
});
