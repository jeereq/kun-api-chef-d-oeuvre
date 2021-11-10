const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRETEPASS, {
		expiresIn: MaxAge
	});
};

const restaurantSchema = new Schema({
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
	likes: [Schema.Types.ObjectId],
	active: { type: Boolean, default: true },
	localisations: [
		{
			longitude: { type: Number },
			latitude: { type: Number }
		}
	]
});

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

		const newUser = { ...args, password: passwordHashed };
		const user = new this(newUser);

		return user.save();
	} catch (err) {
		throw err;
	}
};
restaurantSchema.statics.restaurant_exist = async function (id) {
	return this.findById(id)
		.then((data) => {
			return new Promise((resolve, reject) => {
				data === null ? resolve(false) : resolve(true);
			});
		})
		.catch((err) => {
			throw err;
		});
};
restaurantSchema.statics.is_restaurant = async function (args) {
	const { token } = args;
	if (token) {
		try {
			const { id } = await jwt.verify(token, process.env.SECRETEPASS);
			return this.findById(id);
		} catch (err) {
			throw err;
		}
	} else
		throw new Error("vous n'etes pas un restaurant de notre application !!!");
};
restaurantSchema.statics.login = async function ({ email, password }) {
	try {
		const [restaurant] = await this.find({ email });

		if (!restaurant) throw new Error("restaurant inexistant !!!");

		const response = await bcrypt.compare(password, user.password);
		const token = createToken(user._id);

		await this.is_restaurant({ ...user._doc, token });

		if (response) return { ...user._doc, token };

		throw new Error("mot de passe incorrecte  !!!");
	} catch (err) {
		throw err;
	}
};
module.exports = model("Restaurant", restaurantSchema);
