const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String },
    comment: { type: String },
    date: { type: Date },
    published: { type: Boolean }
});

module.exports = mongoose.model("Blog", blogSchema);