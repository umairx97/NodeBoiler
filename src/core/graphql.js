import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { PubSub } from 'graphql-subscriptions';

import { helloWorldTypeDefs, helloWorldResolvers } from '~/hello-world/graphql';
import { listTypeDefs, listResolvers } from '~/crud-operations/graphql';
import authorization from '~/authorization/graphql';

import { contactTypeDefs } from '../contactRoutes/Graphql/schema'
import { contactResolvers } from '../contactRoutes/Graphql/resolvers'


const typeDefs = mergeTypes(
  [helloWorldTypeDefs, listTypeDefs, authorization.typeDefs, contactTypeDefs],
  {
    all: true,
  },
);

const resolvers = mergeResolvers([
  helloWorldResolvers,
  listResolvers,
  authorization.resolvers,
  contactResolvers
]);

const context = ({ req }) => {
  console.log(req.user);
  // if (!req.user) throw new Error('You must be logged in to query this schema');

  return {
    user: req.user,
  };
};

export const pubsub = new PubSub();

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
