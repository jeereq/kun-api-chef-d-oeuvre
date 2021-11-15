const { Schema, model } = require("mongoose");

const remarkMeatSchema = new Schema(
	{
		message: {
			type: String,
			required: true
		},
		user_id: {
			type: Schema.Types.ObjectId
		},
		meal_id: {
			type: Schema.Types.ObjectId
		}
	},
	{
		timestamps: true
	}
);

module.exports = model("RemarkMeal", remarkMeatSchema);
