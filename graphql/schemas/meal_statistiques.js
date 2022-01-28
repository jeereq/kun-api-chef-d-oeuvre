const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLList,
} = require('graphql');

//schemas

const mealType = require('./meal');

//models

const Meal = require('../../models/meal');
const Restaurant = require('../../models/restaurant');

module.exports = new GraphQLObjectType({
	name: 'meals_statistiques',
	fields: () => ({
		length: {
			type: GraphQLInt,
			resolve() {
				return Meal.find({}).then((data) => {
					return data.length;
				});
			},
		},
		top: {
			type: new GraphQLList(mealType),
			resolve() {
				return Meal.find();
			},
		},
		moyenne: {
			type: GraphQLInt,
			resolve() {
				return Meal.find().then(async (data) =>
					Math.round(
						data.length / (await Restaurant.find().then((data) => data.length))
					)
				);
			},
		},
	}),
});
