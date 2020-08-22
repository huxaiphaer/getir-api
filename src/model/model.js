let mongoose = require('mongoose')
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String
});

mongoose.pluralize(null)
const dataModel = mongoose.model('records', RecordSchema);
module.exports = dataModel