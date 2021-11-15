const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		profil_image: { type: String },
		images: [String],
		price: {
			type: Number,
			required: true
		},
		price_promotion: { type: Number, default: 0 },
		promotion: { type: Boolean, default: false },
		restaurant_id: {
			type: Schema.Types.ObjectId
		}
	},
	{ timestamps: true }
);
mealSchema.statics.verify_name = async function ({ name }) {
	const meal = await this.findOne({ name });
	if (!meal) return meal;
	throw new Error("plat already existe !!!");
};

mealSchema.statics.create = async function (args) {
	try {
		await this.verify_name(args);
		const meal = new this(args);
		return meal.save();
	} catch (err) {
		throw err;
	}
};

module.exports = model("Meal", mealSchema);
