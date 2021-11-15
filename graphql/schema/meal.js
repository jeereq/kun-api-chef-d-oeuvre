const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const restaurantType = require("./restaurant");

const Meal = require("../../models/meal");
const Restaurant = require("../../models/restaurant");

module.exports = new GraphQLObjectType({
	name: "meal",
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		profil_image: { type: new GraphQLNonNull(GraphQLString) },
		price: { type: new GraphQLNonNull(GraphQLString) },
		price_promotion: { type: GraphQLString },
		images: { type: new GraphQLList(GraphQLString) },
		promotion: { type: GraphQLBoolean },
		restaurant_id: {
			type: restaurantType,
			resolve(parent) {
				return Restaurant.findById(parent.restaurant_id);
			}
		},
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString }
	})
});
