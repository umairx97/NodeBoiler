import gql from 'graphql-tag';
import { ContactUs } from './document'
import redis from '../core/redis'

export const contactTypeDefs = gql`

type Requester {
  name: String
  companyName: String
  email: String
  phoneNumber: String
}


  type Contact {
    _id: ID
    talkAbout: String
    timeFrame: String
    projectType: String
    budget: String
    description: String
    requester: Requester
  
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


        return contact

        // redis.set("contact", JSON.stringify(contact));
        // redis.get("contact", function (err, result) {
        //   if (err) {
        //     return contact;
        //   }

        //   console.log(result)
        // });


      } catch (err) {
        return Error(err.message)
      }
    },
  },

};


