/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
	_USER,
	_ADMIN,
	_NOT_USER,
	_NOT_ADMIN,
	_NOT_TOKEN,
} = require('../utils/constant');

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRETEPASS, {
		expiresIn: MaxAge,
	});
};

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "l' email est réquis "],
		},
		password: {
			type: String,
			required: [true, 'le mot de passe est réquis'],
		},
		phone_number: {
			type: String,
			required: [true, 'le numero de telephone est réquis'],
		},
		genre: {
			type: String,
			maxLength: 2,
		},
		image_profile: {
			type: String,
			default: '',
		},
		active: { type: Boolean, default: true },
		authorisation: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

userSchema.statics.is_admin = async function () {};
userSchema.statics.is_user = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.SECRETEPASS);
		return await this.findById(id).then((data) => {
			if (data)
				return data.authorisation === true
					? new Promise((resolve) => {
							resolve({ type: [false, _ADMIN], id: id });
					  })
					: new Promise((resolve) => {
							resolve({ type: [_USER, false], id: id });
					  });
			return new Promise((resolve) => {
				resolve({ type: [_NOT_USER, _NOT_ADMIN], id: null });
			});
		});
	} catch (err) {
		return new Promise((resolve, reject) => {
			reject(_NOT_TOKEN);
		});
	}
};

userSchema.statics.login = async function ({ email, password }) {
	const [user] = await this.find({ email });

	if (!user) throw new Error('utilisateur inexistant !!!');

	const response = await bcrypt.compare(password, user.password);
	const token = await createToken(user._id);

	if (response === false) throw new Error('mot de passe incorrecte  !!!');

	return { ...user._doc, token };
};
userSchema.statics.verify_email = async function ({ email }) {
	const user = await this.findOne({ email });
	if (!user) return user;
	throw new Error('Email already existe !!!');
};

userSchema.statics.signup = async function (args) {
	await this.verify_email(args);

	const argument = await this.is_admin_signup(args);
	const { password } = argument;

	//generate salt en password hashed

	const salt = await bcrypt.genSalt();
	const passwordHashed = await bcrypt.hash(password, salt);

	const newUser = { ...argument, password: passwordHashed };
	const user = new this(newUser).then((data) => {
		return data;
	});

	return user.save();
};
userSchema.statics.is_admin_signup = async function (args) {
	const { email } = args;
	if (email === process.env.EMAIL_ADMIN)
		return { ...args, authorisation: true };
	else return { ...args, authorisation: false };
};
userSchema.statics.desactive = async function (id) {
	return await this.findByIdAndUpdate(id, { active: false }).then((data) => {
		return data;
	});
};

userSchema.statics.active = async function ({ id }) {
	return this.findByIdAndUpdate(id, { active: true }).then((data) => {
		return data;
	});
};

module.exports = model('User', userSchema);
