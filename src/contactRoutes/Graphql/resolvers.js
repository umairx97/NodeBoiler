import { ContactUs } from '../Model/contact'

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