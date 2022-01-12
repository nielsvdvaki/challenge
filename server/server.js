const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const server = express();
const cors = require('cors');
const customerSchema = require('./customerSchema')

// Open server
server.listen(42069, () => console.log('Started server'))

// This is just so that we can access graphql locally, production-worthy server will never have this.
server.use(cors({
    origin: '*'
}));
// Register graphql endpoint
server.use('/graphql', graphqlHTTP({
        graphiql: true,
        schema: customerSchema
    })
)

