import { Router } from 'express';
import { ContactUs } from './Model/contact'
import Joi from 'joi'
import faker from 'faker';

const schema = Joi.object({
    talkAbout: Joi.string().max(50).trim(),
    timeFrame: Joi.string().max(20).trim(),
    projectType: Joi.string().trim().max(25),
    budget: Joi.string().trim(),
    description: Joi.string().trim().max(1000),
    requester: {
        name: Joi.string().trim(),
        companyName: Joi.string().trim(),
        email: Joi.string().trim(),
        phoneNumber: Joi.string().trim(),
    },
})

const router = Router();

/**
 * @example POST /contact-us
 */
router.post('/', async (req, res) => {
    const { talkAbout, timeFrame, projectType, budget, description, requester } = req.body
    schema.validate({ talkAbout, timeFrame, projectType, budget, description, requester }).then(async contactObj => {

        try {
            const saveContactInfo = await ContactUs(contactObj).save()
            console.log("SAVED CONTACT INFORMATION", saveContactInfo);


            if (!saveContactInfo) {
                return res.status(500).send({ success: false, message: "Could Not save information" })
            }

            res.status(200).send({ success: true, message: "Your Information has been submitted to us" })

        } catch (err) {
            res.status(500).send({ success: false, message: "Something went wrong please try again later", err: err.message })
        }

    }).catch(err => {
        res.status(400).send({ success: false, message: "Validation Failed", err: err.message })
    })

});



export default router;
