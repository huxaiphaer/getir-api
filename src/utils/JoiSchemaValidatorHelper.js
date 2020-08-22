const Joi = require('joi');

function isValidGetDataParams(requestParams) {
    const schema = Joi.object().keys({
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().greater(Joi.ref('minCount')).required()
    });

    const { error } = schema.validate({
        startDate: requestParams.startDate,
        endDate: requestParams.endDate,
        minCount: requestParams.minCount,
        maxCount: requestParams.maxCount
    });

    return error ? false : true;
}

module.exports = {
    isValidGetDataParams
}