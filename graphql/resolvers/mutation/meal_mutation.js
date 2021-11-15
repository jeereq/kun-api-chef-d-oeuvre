const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const User = require("../../../models/user");
const Restaurant = require("../../../models/restaurant");
const Meal = require("../../../models/meal");

const {
	userType,
	restaurantType,
	localisationType,
	mealType
} = require("../../schema");

const { _NOT_ADMIN, _NOT_RESTAURANT } = require("../../../utils/constant");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	create_meal: {
		type: new GraphQLNonNull(mealType),
		args: {
			name: {
				type: new GraphQLNonNull(GraphQLString)
			},
			profil_image: {
				type: new GraphQLNonNull(GraphQLString)
			},
			price: {
				type: new GraphQLNonNull(GraphQLString)
			},
			price_promotion: {
				type: new GraphQLNonNull(GraphQLString)
			},
			promotion: {
				type: new GraphQLNonNull(GraphQLBoolean)
			}
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant) return Meal.create({ ...args, restaurant_id: id });
			}, request);
		}
	}
};
