const graphql = require('graphql')
const axios = require('axios')
const {GraphQLList, GraphQLNonNull} = require("graphql");

const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFloat
} = graphql

/**
 * Customer object
 */
const customer = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLInt},
        email: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        ip: {type: GraphQLString},
        latitude: {type: GraphQLFloat},
        longitude: {type: GraphQLFloat},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
    })
});

/**
 * Register all objects.
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customers: {
            type: new GraphQLList(customer),
            resolve () {
                return axios.get(`http://localhost:8999/data`).then(res => res.data);
            }
        },
        customer: {
            type: customer,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: function(rootValue, args) {
                return axios.get(`http://localhost:8999/data`).then(res => res.data).then(response => {
                    return response.filter(item => {
                        return item.id === args.id
                    })[0]
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});