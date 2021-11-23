const {
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLBoolean,
} = require('graphql');

const Meal = require('../../../models/meal');

const { mealType } = require('../../schemas');

const { _NOT_RESTAURANT } = require('../../../utils/constant');
const { is_authenticate } = require('../../../utils/function');

module.exports = {
	create_meal: {
		type: new GraphQLNonNull(mealType),
		args: {
			name: {
				type: new GraphQLNonNull(GraphQLString),
			},
			profil_image: {
				type: new GraphQLNonNull(GraphQLString),
			},
			price: {
				type: new GraphQLNonNull(GraphQLString),
			},
			price_promotion: {
				type: new GraphQLNonNull(GraphQLString),
			},
			promotion: {
				type: new GraphQLNonNull(GraphQLBoolean),
			},
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant) return Meal.create({ ...args, restaurant_id: id });
			}, request);
		},
	},
	delete_meal: {
		type: mealType,
		args: { id: { type: GraphQLID } },
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_restaurant }) {
				if (is_restaurant === _NOT_RESTAURANT) throw new Error(_NOT_RESTAURANT);
				if (is_restaurant)
					return Meal.findById(args.id).then((data) => {
						if (id !== data.restaurant_id)
							throw new Error(
								"vous n'etes pas authoriser a spprimer ce repas "
							);
						Meal.findByIdAndDelete(args.id);
					});
			}, request);
		},
	},
};
