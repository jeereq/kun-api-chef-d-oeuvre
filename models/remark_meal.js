const { Schema, model } = require("mongoose");

const Meal = require("./meal");

const remarkMealSchema = new Schema(
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

remarkMealSchema.statics.create_remark = async function (args) {
	await Meal.exist(args.meal_id);
	const remark = new this(args);
	return remark.save();
};

module.exports = model("RemarkMeal", remarkMealSchema);
