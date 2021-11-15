const { Schema, model } = require("mongoose");

const likeMealSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId
	},
	meal_id: {
		type: Schema.Types.ObjectId
	}
});


module.exports = model("LikeMeal", likeMealSchema);
