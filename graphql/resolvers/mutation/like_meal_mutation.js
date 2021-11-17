const { GraphQLID, GraphQLNonNull } = require('graphql');

const LikeMeal = require('../../../models/like_meal');

const { likeMealType } = require('../../schema');

const { _NOT_RESTAURANT } = require('../../../utils/constant');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	like_dislike_meal: {
		type: new GraphQLNonNull(likeMealType),
		args: {
			user_id: { type: GraphQLID },
			meal_id: { type: GraphQLID },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant) return LikeMeal.like_dislike(args);
			}, request);
		},
	},
};
