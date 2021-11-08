const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRETEPASS, {
		expiresIn: MaxAge
	});
};

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: [true, "l' email est réquis "]
	},
	password: {
		type: String,
		required: [true, "le mot de passe est réquis"]
	},
	phone_number: {
		type: String,
		required: [true, "le numero de telephone est réquis"]
	},
	authorisation: { type: Boolean, default: false }
});

userSchema.statics.verify_email = async function ({ email }) {
	const user = await this.findOne({ email });
	if (!user) return user;
	throw new Error("Email already existe !!!");
};

/*

verifie si l'utilisateur courant est un administrateur lors du signup

*/

userSchema.statics.is_admin_signup = async function (args) {
	const { email } = args;
	if (email === process.env.EMAIL_ADMIN)
		return { ...args, authorisation: true };
	else return { ...args, authorisation: false };
};

/*

verifie si l'utilisateur courant est un administrateur lors du signup

*/

userSchema.statics.signup = async function (args) {
	try {
		await this.verify_email(args);

		const argument = await this.is_admin_signup(args);
		const { password } = argument;

		//generate salt en password hashed

		const salt = await bcrypt.genSalt();
		const passwordHashed = await bcrypt.hash(password, salt);

		const newUser = { ...argument, password: passwordHashed };
		const user = new this(newUser);

		return user.save();
	} catch (err) {
		throw err;
	}
};

userSchema.statics.login = async function ({ email, password }) {
	try {
		const [user] = await this.find({ email });

		if (!user) throw new Error("utilisateur inexistant !!!");

		const response = await bcrypt.compare(password, user.password);
		const token = createToken(user._id);

		await this.is_admin({ ...user._doc, token });

		if (response) return { ...user._doc, token };

		throw new Error("mot de passe incorrecte  !!!");
	} catch (err) {
		throw err;
	}
};

userSchema.statics.is_admin = async function (args) {
	const { token } = args;
	if (token) {
		try {
			const { id } = await jwt.verify(token, process.env.SECRETEPASS);
			const { authorisation } = await this.findById(id);
			return new Promise((resolve, reject) => {
				resolve(authorisation);
			});
		} catch (err) {
			throw err;
		}
	} else
		throw new Error("vous n'etes pas un utilisateur de notre application !!!");
};

module.exports = model("User", userSchema);
