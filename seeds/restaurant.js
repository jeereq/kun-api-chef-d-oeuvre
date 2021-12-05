const Restaurant = require('../models/restaurant');
const mongoose = require('mongoose');

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
				email: 'jeereq' + index * 100 + '@gmail.com',
				name: 'ravens' + index,
				password: 'mingandajeereq',
				phone_number: '0811527302',
				genre: index % 2 == 0 ? 'f' : 'm',
				profil_image: 'liste',
				themes: [],
				localisations: [],
				images: [],
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
