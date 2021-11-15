const { Schema, model } = require("mongoose");

const remarkRestaurantSchema = new Schema(
	{
		message: {
			type: String,
			required: true
		},
		user_id: {
			type: Schema.Types.ObjectId
		},
		restaurant_id: {
			type: Schema.Types.ObjectId
		}
	},
	{
		timestamps: true
	}
);

module.exports = model("RemarkRestaurant", remarkRestaurantSchema);
