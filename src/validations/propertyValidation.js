const Joi = require('joi');


const property = Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    description: Joi.string().required()
});


module.exports = {
    property
}
