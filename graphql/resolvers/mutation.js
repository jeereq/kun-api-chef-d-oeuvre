const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

const { userType } = require("../schema");

module.exports = new GraphQLObjectType({
	name: "RootMutationType",
	fields: {
		signup: {
			type: new GraphQLNonNull(userType),
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				firstname: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				return User.signup(args).catch((err) => {
					throw err;
				});
			}
		}
	}
});
