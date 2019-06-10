import fs from 'fs';
import path from 'path';
import request from 'request-promise';
import { GraphQLServer } from 'graphql-yoga';

import { getRecentMatches, getAllHeroes } from './api/steam';

const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'types.graphql'), 'utf8')
];

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    heroes: getAllHeroes,
    matches: (_, { number }) => getRecentMatches(number),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
