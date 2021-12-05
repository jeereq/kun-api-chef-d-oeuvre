const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
});

module.exports = model('Category', categorySchema);
