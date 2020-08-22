const dataModel = require('../model/model')

class DataRepository {
    constructor() {
    }

    findAll() {
        return dataModel.find({})
    }

    findByFiltering(startDate, endDate, minCount, maxCount) {

        return dataModel.aggregate([
            {
                $project: {
                    _id: 0,
                    key: '$key',
                    createdAt: '$createdAt',
                    totalCount: {$sum: '$counts'}
                }
            },
            {
                $match: {
                    totalCount: {$gt: minCount, $lte: maxCount},
                    createdAt: {$gt: startDate, $lte: endDate}
                }
            }
        ]);
    }
}

module.exports = DataRepository