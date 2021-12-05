const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLBoolean,
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'user',
	fields: () => ({
		_id: { type: GraphQLID },
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		phone_number: { type: new GraphQLNonNull(GraphQLString) },
		image_profile: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: new GraphQLNonNull(GraphQLString) },																							
		authorisation: { type: GraphQLBoolean },
		active: { type: GraphQLBoolean },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		token: { type: GraphQLString },
	}),
});
