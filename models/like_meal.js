const { Schema, model } = require("mongoose");

const likeMealSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId
	},
	meal_id: {
		type: Schema.Types.ObjectId
	}
});

likeMealSchema.statics.add = async function (args) {
	return this.findOne(args).then((response) => {
		if (response) throw new Error("repas deja liker par l'utilisateur");
		const like_meal = new this(args);
		return like_meal.save();
	});
};
likeMealSchema.statics.like_dislike = async function (args) {
	return this.findOne(args).then((response) => {
		if (response) return this.deleteOne(args);
		const like_meal = new this(args);
		return like_meal.save();
	});
};

module.exports = model("LikeMeal", likeMealSchema);
