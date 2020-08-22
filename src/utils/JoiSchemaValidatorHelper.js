/**
 * This helper holds the schema definitions and validators 
 * that may be required in the project. Since we are an 
 * HTTP server, it is extremely important to validate the 
 * request paramaters before sending them to inner bussiness
 * logic layers. 
 */

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