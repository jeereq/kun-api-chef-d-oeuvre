const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	profil_image: { type: String },
	images: [String],
	likes: [Schema.Types.ObjectId],
	price: {
		type: Number,
		required: true
	},
	pricePromotion: { type: Number, default: 0 },
	promotion: { type: Boolean, default: false },
	restaurant_id: {
		type: Schema.Types.ObjectId
	}
});

module.exports = model("Meal", mealSchema);
