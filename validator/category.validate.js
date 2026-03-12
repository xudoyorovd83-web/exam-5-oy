const joi = require("joi");

const categoryValidator = (data) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        imageUrl: joi.string().uri().required()
    });
    return schema.validate(data);
};

module.exports = categoryValidator;