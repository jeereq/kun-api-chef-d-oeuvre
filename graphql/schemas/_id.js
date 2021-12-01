const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: '_id',
	fields: () => ({
		_id: { type: GraphQLID },
	}),
	resolve() {},
});
