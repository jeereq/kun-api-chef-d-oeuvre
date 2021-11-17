const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString
} = require("graphql");

const restaurantType = require("./restaurant");
const userType = require("./user");

const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");

module.exports = new GraphQLObjectType({
	name: "likeRestaurant",
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.user_id);
			}
		},
		restaurant_id: {
			type: GraphQLString
		}
	})
});
