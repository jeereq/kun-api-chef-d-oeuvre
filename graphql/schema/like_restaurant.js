const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql");

const restaurantType = require("./restaurant");
const userType = require("./user");

const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");

module.exports = new GraphQLObjectType({
	name: "likeRestaurant",
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: restaurantType,
			resolve(parent) {
				return Restaurant.findById(parent.user_id);
			}
		},
		restaurant_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.restaurant_id);
			}
		}
	})
});
