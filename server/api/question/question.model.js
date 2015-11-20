'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now },
  author : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  active: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);