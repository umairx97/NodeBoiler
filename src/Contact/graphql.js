import gql from 'graphql-tag';
import { ContactUs } from './document'

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


export const contactResolvers = {

    Query: {
        async Contact(root, model, context) {

            try {
                const contact = await ContactUs.find({});
                if (!contact.length) {
                    throw new Error("No contact Found");
                }

                return contact;

            } catch (err) {
                return Error(err.message)
            }
        },
    },

};


