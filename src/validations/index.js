const Joi = require('joi');

const user = Joi.object({
    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).max(30).required()

});


const property = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    purpose: Joi.string().allow('Buy', 'Sell').required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    images: Joi.object(),
});

const validateUser = (req, res, next) => {
    try {
        const { error } = user.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const validateProperty = (req, res, next) => {
    try {
        const { error } = property.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    validateUser,
    validateProperty
}




