const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

module.exports = new GraphQLObjectType({
	name: "user",
	fields: () => ({
		_id: { type: GraphQLID },
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		phone_number: { type: new GraphQLNonNull(GraphQLString) },
		authorisation: { type: GraphQLBoolean },
		token: { type: GraphQLString }
	})
});
