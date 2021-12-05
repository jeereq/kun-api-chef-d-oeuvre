const { GraphQLObjectType } = require('graphql');

const user_query = require('./user_query');
const restaurant_query = require('./restaurant_query');
const meal_query = require('./meal_query');
const like_meal_query = require('./like_meal_query');
const like_restaurant_query = require('./like_restaurant_query');
const remark_meal_query = require('./remark_meal_query');
const remark_restaurant_query = require('./remark_restaurant_query');
const statistique_query = require('./statistique_query');

module.exports = new GraphQLObjectType({
	name: 'RootQuerytype',
	fields: {
		...meal_query,
		...user_query,
		...restaurant_query,
		...like_meal_query,
		...like_restaurant_query,
		...remark_meal_query,
		...remark_restaurant_query,
		...statistique_query,
	},
});
