const Joi = require('joi');

//Register Validation
const registervalidaton = (data)=>{
    const validate_schema = Joi.object({
        name: Joi.string().min(2).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    })
    return validate_schema.validate(data)
}
const loginvalidaton = (data)=>{
    const validate_schema = Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    })
    return validate_schema.validate(data)
}

module.exports.registervalidaton = registervalidaton
module.exports.loginvalidaton = loginvalidaton