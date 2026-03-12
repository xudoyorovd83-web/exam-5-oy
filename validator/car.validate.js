const joi = require("joi");

const carValidator = (data) => {
    const schema = joi.object({
        model: joi.string().min(1).max(40).required(),
        tanirovka: joi.string().required(),
        motor: joi.string().required(),
        year: joi.number().min(1900).max(2100).required(),
        color: joi.string().required(),
        price: joi.number().min(0).required(),
        distance: joi.number().min(0).default(0),
        gearBox: joi.string().valid("manual", "automatic").required(),
        description: joi.string().min(10).max(200).required(),
        imageUrl: joi.string().uri().required()
    });

    return schema.validate(data);
}

module.exports = carValidator;