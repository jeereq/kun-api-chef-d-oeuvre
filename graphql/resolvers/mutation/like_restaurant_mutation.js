const { GraphQLID, GraphQLNonNull } = require('graphql');

const LikeRestaurant = require('../../../models/like_restaurant');

const { likeRestaurantType } = require('../../schema');

const { _NOT_RESTAURANT } = require('../../../utils/constant');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	like_dislike_restaurant: {
		type: new GraphQLNonNull(likeRestaurantType),
		args: {
			user_id: { type: GraphQLID },
			restaurant_id: { type: GraphQLID },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant) return LikeRestaurant.like_dislike(args);
			}, request);
		},
	},
};
