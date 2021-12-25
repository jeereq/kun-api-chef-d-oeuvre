const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
} = require('graphql');

//schemas

const usersStatistiquesType = require('./users_statistiques');
const restaurantsStatistiquesType = require('./restaurants_statistiques');
const mealsStatistiquesType = require('./meal_statistiques');

module.exports = new GraphQLObjectType({
	name: 'statistique',
	fields: () => ({
		user: { type: new GraphQLNonNull(usersStatistiquesType) },
		restaurant: { type: new GraphQLNonNull(restaurantsStatistiquesType) },
		total: { type: new GraphQLNonNull(GraphQLInt) },
		meal: { type: new GraphQLNonNull(mealsStatistiquesType) },
		remark_restaurant: { type: new GraphQLNonNull(GraphQLString) },
		remark_meal: { type: new GraphQLNonNull(GraphQLString) },
		like_restaurant: { type: new GraphQLNonNull(GraphQLString) },
		like_meal: { type: new GraphQLNonNull(GraphQLString) },
	}),
});
