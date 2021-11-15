const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const localisationType = require("./localisation");
const likeRestaurantType = require("./like_restaurant");

const Like = require("../../models/like_restaurant");

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
		likes: {
			type: new GraphQLList(likeRestaurantType),
			resolve(parent, args) {
				return Like.find({ restaurant_id: parent._id }).limit(10);
			}
		},
		localisations: { type: new GraphQLList(localisationType) },
		token: { type: GraphQLString },
		active: { type: new GraphQLNonNull(GraphQLBoolean) }
	})
});
