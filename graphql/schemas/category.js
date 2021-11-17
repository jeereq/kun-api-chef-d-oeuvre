const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'category',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		meals: { type: new GraphQLList(GraphQLString) },
	}),
});
