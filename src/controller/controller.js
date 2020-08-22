const joi = require('@hapi/joi');
const DataRepository = require("../repository/repository");


const schema = joi.object({
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    minCount: joi.number().required(),
    maxCount: joi.number().required(),
})

exports.getAllRecords = async (req, res, next) => {
    const dataRepository = new DataRepository();
    dataRepository.findAll().then((records) => {
        res.send(records)
    })
}

exports.filterRecordsData = async (req, res, next) => {
    try {
        const joiCheck = await schema.validate(res.body);
        if (joiCheck.error)
            return res.status(400).json(joiCheck.error)

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const minCount = parseInt(req.body.minCount);
        const maxCount = parseInt(req.body.maxCount);


        const dataRepository = new DataRepository();

        dataRepository.findByFiltering(startDate, endDate, minCount, maxCount).then(
            (queryResult) => {

                if (queryResult.length > 0) {
                    const response = {code: 0, msg: "Success", records: queryResult};
                    return res.status(200).send(response);
                } else {
                    const response = {code: 1, msg: "Sorry no data available", records: queryResult};
                    return res.status(200).send(response);
                }
            }
        );

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}