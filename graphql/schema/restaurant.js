const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const localisationType = require("./localisation");

module.exports = new GraphQLObjectType({
	name: "restaurant",
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		phone_number: { type: new GraphQLNonNull(GraphQLString) },
		profil_image: { type: new GraphQLNonNull(GraphQLString) },
		images: { type: new GraphQLList(GraphQLString) },
		likes: { type: new GraphQLList(GraphQLID) },
		localisations: { type: new GraphQLList(localisationType) },
		token: { type: GraphQLString },
		active: { type: new GraphQLNonNull(GraphQLBoolean) }
	})
});
