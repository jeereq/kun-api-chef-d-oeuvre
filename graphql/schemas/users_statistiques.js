const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLList,
} = require('graphql');

//schemas

const userType = require('./user');

//models

const User = require('../../models/user');

module.exports = new GraphQLObjectType({
	name: 'users_statistiques',
	fields: () => ({
		length: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve() {
				return User.find({ authorisation: false }).then((data) => {
					return data.length;
				});
			},
		},
		top: {
			type: new GraphQLList(userType),
			resolve() {
				return User.find({ authorisation: false });
			},
		},
	}),
});
