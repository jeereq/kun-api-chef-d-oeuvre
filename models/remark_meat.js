const { Schema, model } = require("mongoose");

const remarkRestaurantSchema = new Schema({
	message: {
		type: String,
		required: true
	},
	user_id: {
		type: Schema.Types.ObjectId
	},
	restaurant_id: {
		type: Schema.Types.ObjectId
	},
	date: {
		type: Schema.Types.Date,
		default: new Date()
	}
});

module.exports = model("RemarkMeat", remarkMeatSchema);
