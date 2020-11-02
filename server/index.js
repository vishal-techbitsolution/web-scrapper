const { GraphQLServer } = require('graphql-yoga');
const typeDefs = require('./src/schema/schema');
const resolvers = require('./src/resolver/resolver');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/WebScrapperApp");

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open", function(){
    server.start(() => console.log('Server is running on localhost:4000'))
});