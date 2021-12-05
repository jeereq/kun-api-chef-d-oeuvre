const Meal = require('../models/meal');
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
		Restaurant.find({}).then((data) => {
			data.map((itemID) => {
				Taille.map(async (item, index) => {
					const meal = new Meal({
						name: 'ravens' + index,
						password: 'mingandajeereq',
						phone_number: '0811527302',
						price: index * 3,
						profil_image: 'liste',
						restaurant_id: itemID._id,
						categorys: [],
						images: [],
					});
					await meal
						.save()
						.then(() => {
							console.log('créer : ' + index);
						})
						.catch((err) => console.log(err));
				});
			});
		});
	})
	.catch((err) => {
		console.log(err);
	});
