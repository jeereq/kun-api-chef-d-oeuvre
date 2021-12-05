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

const restaurantType = require('./restaurant');

//models

const Restaurant = require('../../models/restaurant');

module.exports = new GraphQLObjectType({
	name: 'restaurants_statistiques',
	fields: () => ({
		length: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve(parent, args, request) {
				return Restaurant.find({}).then((data) => {
					console.log(data);
					return 1;
				});
			},
		},
		top: {
			type: new GraphQLList(restaurantType),
			resolve(parent, args, request) {
				return;
			},
		},
	}),
});
