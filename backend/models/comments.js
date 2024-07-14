const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
