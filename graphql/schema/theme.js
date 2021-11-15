const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

const restaurantType = require("./restaurant");

module.exports = new GraphQLObjectType({
	name: "theme",
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		restaurants: { type: new GraphQLList(GraphQLString) }
	})
});
