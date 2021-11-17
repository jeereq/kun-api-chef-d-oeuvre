const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const RemarkRestaurant = require("../../../models/remark_restaurant");

const { remarkRestaurantType } = require("../../schemas");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	remark_restaurant_user: {
		type: new GraphQLList(remarkRestaurantType),
		args: {
			user_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return await RemarkRestaurant.find({ user_id: args.user_id });
			}, request);
		}
	},
	remark_restaurant: {
		type: new GraphQLList(remarkRestaurantType),
		args: {
			restaurant_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return await RemarkRestaurant.find({
						restaurant_id: args.restaurant_id
						});
			}, request);
		}
	},
	remark_restaurant_meals: {
		type: new GraphQLList(remarkRestaurantType),
		resolve(parent, args, context) {
			return is_authenticate(async function () {
				return await RemarkRestaurant.find({});
			}, context);
		}
	}
};
