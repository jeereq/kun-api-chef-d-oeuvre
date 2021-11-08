const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	meals: [Schema.Types.ObjectId]
});

module.exports = model("Category", categorySchema);
