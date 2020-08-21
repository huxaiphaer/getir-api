let mongoose = require('mongoose')

let dataSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minCount: {
        type: Number,
        required: true,
    },
    maxCount: {
        type: Number,
        required: true
    },
    totalCount: {type: Number}, //optional
    created_date: {
        type: Date,
        default: Date.now
    }
});

mongoose.pluralize(null)
const dataModel = mongoose.model(process.env.DATABASE, dataSchema);
module.exports = dataModel