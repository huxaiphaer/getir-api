const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    key: String,
    value: String,
    createdAt: { type: Date },
    counts: [{
        type: Number
    }]
});

const RecordModel = mongoose.model('record', RecordSchema);

module.exports = {
    RecordModel,
    RecordSchema,
}