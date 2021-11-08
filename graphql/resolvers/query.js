const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = require("graphql");

const User = require("../../models/user");

const { userType } = require("../schema");

module.exports = new GraphQLObjectType({
	name: "RootQuerytype",
	fields: {
		user: {
			type: userType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return User.findById(args.id);
			}
		},
		users: {
			type: new GraphQLList(userType),
			args: {
				authorisation: { type: GraphQLBoolean, default: false }
			},
			resolve(parent, { authorisation }) {
				let args = false;
				if (authorisation !== undefined) args = authorisation;
				return User.find({ authorisation: args });
			}
		},
		login: {
			type: userType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				return User.login(args);
			}
		}
	}
});
