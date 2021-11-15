const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
	_RESTAURANT,
	_NOT_RESTAURANT,
	_NOT_TOKEN
} = require("../utils/constant");

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRETEPASS, {
		expiresIn: MaxAge
	});
};

const restaurantSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		phone_number: {
			type: String,
			required: true
		},
		profil_image: { type: String },
		images: [String],
		active: { type: Boolean, default: true },
		localisations: [
			{
				longitude: { type: Number },
				latitude: { type: Number }
			}
		]
	},
	{
		timestamps: true
	}
);

restaurantSchema.statics.is_restaurant_by_id = async function ({ id }) {
	try {
		const restaurant = await this.findById(id);
		return new Promise((resolve, reject) => {
			resolve(restaurant);
		});
	} catch (err) {
		throw err;
	}
};

restaurantSchema.statics.is_restaurant = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.SECRETEPASS);
		return await this.findById(id).then((data) => {
			if (data)
				return new Promise((resolve, reject) => {
					resolve({ type: [_RESTAURANT], id: id });
				});
			else
				return new Promise((resolve, reject) => {
					resolve({ type: [_NOT_RESTAURANT], id: null });
				});
		});
	} catch (err) {
		return new Promise((resolve, reject) => {
			reject(_NOT_TOKEN);
		});
	}
};
restaurantSchema.statics.login = async function ({ email, password }) {
	try {
		const [restaurant] = await this.find({ email });

		if (!restaurant) throw new Error("restaurant inexistant !!!");

		const response = await bcrypt.compare(password, restaurant.password);
		const token = createToken(restaurant._id);

		await this.is_restaurant({ ...restaurant._doc, token });

		if (response) return { ...restaurant._doc, token };

		throw new Error("mot de passe incorrecte  !!!");
	} catch (err) {
		throw err;
	}
};

restaurantSchema.statics.verify_email = async function ({ email }) {
	const user = await this.findOne({ email });
	if (!user) return user;
	throw new Error("Email already existe !!!");
};
restaurantSchema.statics.signup = async function (args) {
	try {
		await this.verify_email(args);

		const { password } = args;

		//generate salt en password hashed

		const salt = await bcrypt.genSalt();
		const passwordHashed = await bcrypt.hash(password, salt);

		const newRestaurant = { ...args, password: passwordHashed };
		const restaurant = new this(newRestaurant);

		return restaurant.save();
	} catch (err) {
		throw new Error(err);
	}
};
restaurantSchema.statics.active = async function ({ id }) {
	return this.findByIdAndUpdate(id, { active: true }).then((data) => {
		return data;
	});
};
restaurantSchema.statics.desactive = async function (id) {
	return await this.findByIdAndUpdate(id, { active: false }).then((data) => {
		return data;
	});
};

module.exports = model("Restaurant", restaurantSchema);
