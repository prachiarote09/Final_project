const Joi = require('joi');

const loginValidation= (req,res,next) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        grnumber:Joi.string().min(4).max(100).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:'Bad request',error})
    }
    next();
}

module.exports={
    loginValidation
}