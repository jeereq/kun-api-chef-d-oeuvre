const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLInt,
} = require('graphql');

//schemas

const localisationType = require('./localisation');
const likeRestaurantType = require('./like_restaurant');
const themeType = require('./theme');

//models

const LikeRestaurant = require('../../models/like_restaurant');
const Theme = require('../../models/theme');

module.exports = new GraphQLObjectType({
	name: 'restaurant',
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
			resolve(parent) {
				return LikeRestaurant.find({ restaurant_id: parent._id });
			},
		},
		themes: {
			type: new GraphQLList(themeType),
			resolve() {
				return Theme.find({});
			},
		},
		localisations: { type: new GraphQLList(localisationType) },
		token: { type: GraphQLString },
		active: { type: new GraphQLNonNull(GraphQLBoolean) },
		visites: { type: GraphQLInt },
	}),
});
