import { Router } from 'express';
import { ContactUs } from './Model/contact'
import Joi from 'joi'

const schema = Joi.object({
    talkAbout: Joi.number(),
    timeFrame: Joi.string(),
    projectType: Joi.string(),
    budget: Joi.string(),
    description: Joi.string(),
    requester: {
        name: Joi.string(),
        companyName: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
    },
})

const router = Router();

/**
 * @example POST /contact-us
 */
router.post('/', async (req, res) => {
    const { talkAbout, timeFrame, projectType, budget, description, requester } = req.body
    schema.validate({  talkAbout, timeFrame, projectType, budget, description, requester }).then(validObj => {
    
        const saveContactInfo = await ContactUs(validObj).save()




    }).catch(err => { 
        res.status(400).send({ success: false, message: "Validation Failed", err: err.message })
    })

    

});

export default router;
