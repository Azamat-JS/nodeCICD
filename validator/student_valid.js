const Joi = require('joi')

exports.studentValidator = (data) => {
       const schema = Joi.object({
        full_name: Joi.string().min(6).max(40).required(),
        
        phone_student: Joi.string().max(30).required(),
    
        subject: Joi.string().max(30).required(),
    
        parents_name: Joi.string().min(2).max(30).required(),

        phone_parents: Joi.string().max(30).required(),

        image: Joi.string()
    })
    return schema.validate(data) 
    }