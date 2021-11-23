const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql');

const RemarkMeal = require('../../../models/remark_meal');

const { likeRestaurantType } = require('../../schemas');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	create_remark_meal: {
		type: new GraphQLNonNull(likeRestaurantType),
		args: {
			meal_id: { type: GraphQLID },
			message: { type: GraphQLString },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id }) {
				return RemarkMeal.create_remark({ ...args, user_id: id });
			}, request);
		},
	},
	delete_remark_meal: {
		type: new GraphQLNonNull(likeRestaurantType),
		args: {
			id: { type: GraphQLID },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id }) {
				return RemarkMeal.create_remark({ ...args, user_id: id });
			}, request);
		},
	},
};
