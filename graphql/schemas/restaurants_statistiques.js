const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLNonNull,
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
			resolve() {
				return Restaurant.find({}).then((data) => {
					return data.length;
				});
			},
		},
		top: {
			type: new GraphQLList(restaurantType),
			resolve() {
				return Restaurant.find().limit(5).sort({ visites: -1 });
			},
		},
	}),
});
