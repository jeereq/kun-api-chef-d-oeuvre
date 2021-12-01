const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'statistique',
	fields: () => ({
		users: { type: new GraphQLNonNull(GraphQLString) },
		restaurants: { type: new GraphQLNonNull(GraphQLString) },
		total: { type: new GraphQLNonNull(GraphQLString) },
	}),
});
