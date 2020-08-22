const mongoose = require('mongoose');
const RESPONSE_CODES = require("../utils/RESPONSE_CODES.json");
const {RecordModel} = require("../models/record");


module.exports = function () {

    let DB_URI;

    function main() {
        DB_URI = process.env.MONGODB_URL;
    }

    this.connectToDB = function () {
        return new Promise((resolve, reject) => {
            mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

            const db = mongoose.connection;
            db.on('error', (error) => {
                reject(error);
            });
            db.once('open', () => {
                resolve()
            });
        });
    };

    this.disconnect = function () {
        mongoose.connection.close();
    };

    function isConnected() {
        return mongoose.connection && mongoose.connection.readyState === 1;
    }

    this.getFilteredRecords = function (startDate, endDate, minCount, maxCount) {
        if (!isConnected()) {
            return Promise.reject(RESPONSE_CODES.DB_CONNECTION_FAILED);
        }

        try {
            return RecordModel.aggregate([
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        createdAt: 1,
                        totalCount: {
                            $sum: "$counts"
                        }
                    }
                },
                {
                    $match: {
                        createdAt: {
                            $lte: new Date(endDate),
                            $gte: new Date(startDate)
                        },
                        totalCount: {
                            $lte: maxCount,
                            $gte: minCount
                        }
                    }
                }
            ]);
        } catch (exception) {
            return Promise.reject(RESPONSE_CODES.DB_CONNECTION_FAILED);
        }
    };

    main();
};