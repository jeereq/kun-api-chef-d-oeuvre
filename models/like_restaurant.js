const { Schema, model } = require('mongoose');

const likeRestaurantSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	restaurant_id: {
		type: Schema.Types.ObjectId,
		ref: 'Restauran',
	},
});
likeRestaurantSchema.statics.add = async function (args) {
	return this.findOne(args).then((response) => {
		if (response) throw new Error("restaurant deja liker par l'utilisateur");
		const like_restaurant = new this(args);
		return like_restaurant.save();
	});
};
likeRestaurantSchema.statics.like_dislike = async function (args) {
	return this.findOne(args).then((response) => {
		if (response) return this.deleteOne(args);
		const like_restaurant = new this(args);
		return like_restaurant.save();
	});
};
module.exports = model('LikeRestaurant', likeRestaurantSchema);
