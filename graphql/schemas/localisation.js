const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

module.exports = new GraphQLObjectType({
	name: "localisation",
	fields: () => ({
		longitude: { type: new GraphQLNonNull(GraphQLString) },
		latitude: { type: new GraphQLNonNull(GraphQLString) }
	})
});
