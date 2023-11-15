const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: { type: String },
    comment: { type: String },
    date: { type: Date }
});

module.exports = mongoose.model("Comment", commentSchema);