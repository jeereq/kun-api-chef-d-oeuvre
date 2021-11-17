const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const likeRestaurant = require("../../../models/like_restaurant");

const { likeRestaurantType } = require("../../schemas");

const { is_authenticate } = require("../../../utils/function");

module.exports = {
	like_restaurant: {
		type: new GraphQLList(likeRestaurantType),
		args: {
			restaurant_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return await likeRestaurant.find({
						restaurant_id: args.restaurant_id
					});
			}, request);
		}
	},
	like_restaurants: {
		type: new GraphQLList(likeRestaurantType),
		resolve(parent, args, context) {
			return is_authenticate(async function () {
				return await likeRestaurant.find({});
			}, context);
		}
	}
};
