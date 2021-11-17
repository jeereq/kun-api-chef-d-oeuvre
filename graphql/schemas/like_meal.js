const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql");

const mealType = require("./meal");
const userType = require("./user");

const User = require("../../models/user");
const Meal = require("../../models/meal");

module.exports = new GraphQLObjectType({
	name: "likeMeal",
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.user_id);
			}
		},
		meal_id: {
			type: mealType,
			resolve(parent) {
				return Meal.findById(parent.meal_id);
			}
		}
	})
});
