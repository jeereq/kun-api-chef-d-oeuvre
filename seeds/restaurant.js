const Restaurant = require('../models/restaurant');
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
			const restaurant = new Restaurant({
				email: faker.internet.email(),
				name: faker.name.firstName(),
				password: 'mingandajeereq',
				phone_number: faker.phone.phoneNumber(),
				genre: index % 2 == 0 ? 'F' : 'M',
				profil_image: faker.image.avatar(),
				themes: [],
				localisations: [],
				images: [],
				visites: faker.datatype.number(),
			});
			await restaurant
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
