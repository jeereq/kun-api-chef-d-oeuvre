const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const Meal = require("../../../models/meal");

const { mealType } = require("../../schema");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	meal: {
		type: new GraphQLList(mealType),
		args: {
			restaurant_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth)
					return await Meal.find({ restaurant_id: args.restaurant_id });
			}, request);
		}
	},
	meals: {
		type: new GraphQLList(mealType),
		resolve(parent, args, context) {
			return is_authenticate(async function () {
				return await Meal.find({});
			}, context);
		}
	}
};
