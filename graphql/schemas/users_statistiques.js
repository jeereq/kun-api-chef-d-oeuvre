const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLNonNull,
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
				return User.find({ authorisation: false }).limit(5).sort({ _id: -1 });
			},
		},
		femme: {
			type: new GraphQLList(userType),
			resolve() {
				return User.find({ authorisation: false, genre: 'F' }).then((data) => {
					return data;
				});
			},
		},
		femme_length: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve() {
				return User.find({ authorisation: false, genre: 'F' }).then((data) => {
					return data.length;
				});
			},
		},
		homme: {
			type: new GraphQLList(userType),
			resolve() {
				return User.find({ authorisation: false, genre: 'M' }).then((data) => {
					return data;
				});
			},
		},
		homme_length: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve() {
				return User.find({ authorisation: false, genre: 'M' }).then((data) => {
					return data.length;
				});
			},
		},
	}),
});
