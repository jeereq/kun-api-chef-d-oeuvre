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
const RestRestaurantaurant = require("../../../models/restaurant");
const Meal = require("../../../models/meal");

const {
	userType,
	restaurantType,
	localisationType,
	mealType,
	likeMealType
} = require("../../schema");

const {
	_NOT_ADMIN,
	_NOT_RESTAURANT,
	_NOT_USER
} = require("../../../utils/constant");
const { is_authenticate } = require("../../../utils/function");

module.exports = {
	add_like_meal: {
		type: new GraphQLNonNull(likeMealType),
		args: {
			user_id: { type: GraphQLID },
			meal_id: { type: GraphQLID }
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_user === _NOT_USER) throw new Error(_NOT_USER);
				if (is_restaurant) return Meal.create({ ...args, restaurant_id: id });
			}, request);
		}
	},
	delete_meal: {
		type: mealType,
		args: { id: { type: GraphQLID } },
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant)
					return Meal.findById(args.id).then((data) => {
						if (id !== data.restaurant_id)
							throw new Error(
								"vous n'etes pas authoriser a spprimer ce repas "
							);
						Meal.findByIdAndDelete(args.id);
					});
			}, request);
		}
	}
};
