const User = require('../models/user');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const Taille = [...new Array(50)];

mongoose
	.connect(`mongodb://localhost:27017/test_kun_api`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		Taille.map(async (item, index) => {
			const user = new User({
				email: faker.internet.email(),
				username: faker.name.firstName(),
				password: 'mingandajeereq',
				phone_number: faker.phone.phoneNumber(),
				genre: index % 2 == 0 ? 'F' : 'M',
				image_profile: faker.image.avatar(),
			});
			await user
				.save()
				.then(() => {
					console.log('créer');
				})
				.catch((err) => console.log(err));
		});
	})
	.catch((err) => {
		console.log(err);
	});
