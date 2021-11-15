const { GraphQLObjectType } = require("graphql");

const user_query = require("./user_query");
const restaurant_query = require("./restaurant_query");
const meal_query = require("./meal_query");

module.exports = new GraphQLObjectType({
	name: "RootQuerytype",
	fields: {
		...meal_query,
		...user_query,
		...restaurant_query
	}
});
