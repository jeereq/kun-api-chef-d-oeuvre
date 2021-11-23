const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./graphql/resolvers');

const is_auth = require('./middlewares/is_auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('<h1> kun api par minganda ibanga jeereq</h1>');
});

//middleware d'authentification

app.use('/', is_auth);

//graphql schema for all query and resolver

app.use('/graphql', graphqlHttp({ schema, graphiql: true }));

//mongodb://localhost:27017/test_kun_api
//mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.w82cr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority

mongoose
	.connect(`mongodb://localhost:27017/test_kun_api`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		app.listen(`${process.env.PORT}`, () => {
			console.log('running server on port ' + process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
