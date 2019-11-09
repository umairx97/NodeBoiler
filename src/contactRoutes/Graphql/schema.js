import gql from 'graphql-tag';

// import { List } from './document';

export const contactTypeDefs = gql`
  type Contact {
    _id: ID
    talkAbout: String
    timeFrame: String
    projectType: String
    budget: String
    description: String
  
  }

  type Query {
    Contact: [Contact]
  }

`;

