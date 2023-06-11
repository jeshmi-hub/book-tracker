const joi = require('joi')

const schema = joi.object({
    firstName: joi.string()
               .max(25)
               .min(2)
               .required(true)
               .trim(true),

    lastName: joi.string()
              .max(25)
              .min(2)
              .required(true)
              .trim(true),
    username: joi.string()
             .max(25)
             .min(2)
             .required(true)
             .trim(true),
    email: joi.string().regex(/^[a-zA-Z0-9_.+-]+@arbyte\.com\.np$/),

    password: joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')),

    confirmPassword: joi.ref('password'),

    verified: joi.boolean()
              .default(false),
    role: joi.number().valid(0,1)

})

const userValidation = async(req, res, next) => {
    const response = req.body
    const {error} = schema.validate(response)
    if(!error){
        next()
    }else {
       return res.status(500).json({message: error.message})
    }
}

module.exports = userValidation