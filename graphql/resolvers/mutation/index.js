const { GraphQLObjectType } = require("graphql");

const meal_mutation = require("./meal_mutation");
const restaurant_mutation = require("./restaurant_mutation");
const user_mutation = require("./user_mutation");

module.exports = new GraphQLObjectType({
	name: "RootMutationType",
	fields: { ...meal_mutation, ...restaurant_mutation, ...user_mutation }
});
