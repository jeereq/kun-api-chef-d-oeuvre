const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const userType = require('./user');

const User = require('../../models/user');

module.exports = new GraphQLObjectType({
	name: 'likeRestaurant',
	fields: () => ({
		_id: { type: GraphQLID },
		user_id: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.user_id);
			},
		},
		restaurant_id: {
			type: GraphQLString,
		},
	}),
});
