const { Schema, model } = require("mongoose");

const ThemeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	restaurants: [Schema.Types.ObjectId]
});

module.exports = model("Theme", ThemeSchema);
