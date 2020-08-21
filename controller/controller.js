const dataModel = require('../model/model')
const joi = require('@hapi/joi');


const schema = joi.object({
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    minCount: joi.number().required(),
    maxCount: joi.number(),
})

exports.createData = async (req, res, next) => {
    try {

        const joiCheck = await schema.validate(res.body);
        if (joiCheck.error)
            return res.status(400).json(joiCheck.error)

        const newData = await (dataModel.create(req.body))
        res.status(201).json(newData)

    } catch (e) {
        res.status(500).json(e)
    }
}