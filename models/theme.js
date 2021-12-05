const { Schema, model } = require('mongoose');

const ThemeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
});

module.exports = model('Theme', ThemeSchema);
