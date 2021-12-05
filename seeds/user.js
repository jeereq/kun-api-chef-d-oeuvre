const User = require('../models/user');
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
			const user = new User({
				email: 'jeereq' + index * 100 + '@gmail.com',
				username: 'jeereq' + index,
				password: 'mingandajeereq',
				phone_number: '0811527302',
				genre: index % 2 == 0 ? 'f' : 'm',
				image_profile: 'liste',
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
