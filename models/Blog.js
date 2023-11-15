const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    published: { type: Boolean, required: true }
});

module.exports = mongoose.model("Blog", blogSchema);