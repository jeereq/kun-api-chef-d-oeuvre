const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

export default userType = new GraphQLObjectType({
	name: "user",
	fields: () => ({})
});
