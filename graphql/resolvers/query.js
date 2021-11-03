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
			resolve(parent, args) {
				return User.find({});
			}
		}
	}
});
