const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: { type: String },
    comment: { type: String },
    date: { type: Date },
    parent: { type: Schema.Types.ObjectId, ref: "Blog" }
});

module.exports = mongoose.model("Comment", commentSchema);