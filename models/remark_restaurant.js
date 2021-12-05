const { Schema, model } = require('mongoose');

const remarkRestaurantSchema = new Schema(
	{
		message: {
			type: String,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		restaurant_id: {
			type: Schema.Types.ObjectId,
			ref: 'Restaurant',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model('RemarkRestaurant', remarkRestaurantSchema);
