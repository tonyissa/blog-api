const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: { type: String },
    comment: { type: String },
    blog: { type: Schema.Types.ObjectId, ref: "Blog" },
    date: { type: Date }
});

module.exports = mongoose.model("Comment", commentSchema);