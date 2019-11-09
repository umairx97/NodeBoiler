import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
    talkAbout: {
        type: String,
        trim: true
    },

    timeFrame: {
        type: String,
        trim: true,
    },

    projectType: {
        type: String,
        trim: true
    },

    budget: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    requester: {
        name: {
            type: String,
            trim: true
        },

        companyName: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            validate: {
                validator: (value) => {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
                },
                message: props => `${props.value} is not a valid email address!`
            },

            phoneNumber: {
                type: String, 
                trim: true, 
            }
        }
    },

});

export const ContactUs = mongoose.model('ContactUs', contactSchema);
