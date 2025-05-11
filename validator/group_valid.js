const Joi = require('joi')

exports.groupValidator = (data) => {
       const schema = Joi.object({
        teacherId: Joi.string().min(6).max(40).required(),

        subject: Joi.string().min(6).max(40).required(),
        
        days: Joi.string().max(30).required(),
    
        lesson_time: Joi.string().max(30).required(),
    
        teacher_name: Joi.string().min(2).max(30).required(),

        phone_teacher: Joi.string().max(30).required(),
    })
    return schema.validate(data) 
    }