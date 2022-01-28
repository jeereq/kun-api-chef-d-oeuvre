const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const User = require('../../../models/user');

const { userType } = require('../../schemas');

const { _NOT_USER, _NOT_ADMIN } = require('../../../utils/constant');

const { is_authenticate } = require('../../../utils/function');

module.exports = {
	signup: {
		type: new GraphQLNonNull(userType),
		args: {
			username: { type: new GraphQLNonNull(GraphQLString) },
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) },
			phone_number: {
				type: new GraphQLNonNull(GraphQLString),
			},
			image_profile: { type: new GraphQLNonNull(GraphQLString) },
			genre: { type: GraphQLString },
		},
		resolve(parent, args) {
			return User.signup(args);
		},
	},
	update_password: {
		type: new GraphQLNonNull(userType),
	},
	update_profil: {
		type: userType,
		args: {
			_id: { type: GraphQLString },
			username: { type: GraphQLString },
			email: { type: GraphQLString },
			phone_number: { type: GraphQLString },
			image_profile: { type: GraphQLString },
			genre: { type: GraphQLString },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_user }) {
				//if (is_user === _NOT_USER) throw new Error(_NOT_USER);
				return await User.findById(id).then((data) => {
					console.log(id);
					console.log(data);
				});
			}, request);
		},
	},
	desactive_user: {
		type: new GraphQLNonNull(userType),
		resolve(parent, args, request) {
			return is_authenticate(async function ({ id, is_user }) {
				if (is_user === _NOT_USER) throw new Error(_NOT_USER);
				return await User.desactive(id);
			}, request);
		},
	},
	desactive_user_by_admin: {
		type: new GraphQLNonNull(userType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return User.desactive(args.id);
			}, request);
		},
	},
	active_user: {
		type: new GraphQLNonNull(userType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return await User.active(args);
			}, request);
		},
	},
	delete_user: {
		type: new GraphQLNonNull(userType),
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
		},
		resolve(parent, args, request) {
			return is_authenticate(async function ({ is_admin }) {
				if (is_admin === _NOT_ADMIN) throw new Error(_NOT_ADMIN);
				return await User.findByIdAndDelete(args.id).then((data) => {
					return data;
				});
			}, request);
		},
	},
};
