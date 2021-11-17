const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
} = require('graphql');

const mealType = require('./meal');
const userType = require('./user');

const Meal = require('../../models/meal');
const User = require('../../models/user');

module.exports = new GraphQLObjectType({
	name: 'remarkMeal',
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.user_id);
			},
		},
		meal_id: {
			type: mealType,
			resolve(parent) {
				return Meal.findById(parent.meal_id);
			},
		},
		message: {
			type: new GraphQLNonNull(GraphQLString),
		},
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	}),
});
