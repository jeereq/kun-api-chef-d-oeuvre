const { Schema, model } = require("mongoose");

const likeMeatSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId
	},
	meal_id: {
		type: Schema.Types.ObjectId
	}
});

module.exports = model("LikeMeal", likeMeatSchema);
