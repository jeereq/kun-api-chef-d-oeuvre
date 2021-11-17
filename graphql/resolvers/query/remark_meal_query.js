const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const RemarkMeal = require("../../../models/remark_meal");

const { remarkMealType } = require("../../schemas");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	remark_user: {
		type: new GraphQLList(remarkMealType),
		args: {
			user_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) return await RemarkMeal.find({ user_id: args.user_id });
			}, request);
		}
	},
	remark_meal: {
		type: new GraphQLList(remarkMealType),
		args: {
			meal_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) return await RemarkMeal.find({ meal_id: args.meal_id });
			}, request);
		}
	},
	remark_meals: {
		type: new GraphQLList(remarkMealType),
		resolve(parent, args, context) {
			return is_authenticate(async function () {
				return await RemarkMeal.find({});
			}, context);
		}
	}
};
