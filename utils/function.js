const { _NOT_TOKEN } = require('./constant');

module.exports = {
	//prends en parametre un callback ainsi que le context courant de l'application ou les elements de la requete
	is_authenticate: async function (callback, { authentification }) {
		//genereras une erreur si l'une de clé de l'objet authentification a la meme valeur que  _NOT_TOKEN

		const { is_user, is_admin, is_restaurant } = authentification;

		if (
			is_user === _NOT_TOKEN ||
			is_admin === _NOT_TOKEN ||
			is_restaurant === _NOT_TOKEN
		)
			throw new Error(_NOT_TOKEN);
		else return await callback(authentification);
	},
};
