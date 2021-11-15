const { Schema, model } = require("mongoose");

const likeRestaurantSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId
	},
	restaurant_id: {
		type: Schema.Types.ObjectId
	}
});

module.exports = model("LikeRestaurant", likeRestaurantSchema);
