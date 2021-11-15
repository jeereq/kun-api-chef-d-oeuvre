const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const LikeMeal = require("../../../models/like_meal");

const { likeMealType } = require("../../schema");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	like_meal: {
		type: likeMealType,
		args: {
			meal_id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_auth }) {
				if (is_auth) return await LikeMeal.find({ meal_id: args.meal_id });
			}, request);
		}
	},
	like_meals: {
		type: new GraphQLList(likeMealType),
		resolve(parent, args, context) {
			return is_authenticate(async function () {
				return await LikeMeal.find({});
			}, context);
		}
	}
};
