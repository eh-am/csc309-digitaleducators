'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InboxSchema = new Schema({
  // the person who is being helped
  helper: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  helped: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question : {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  messages:[{
    message: String, //the actual message
    author: { // the person who said that
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postedAt: { type: Date, default: Date.now }, // when it was said
  }]
});

module.exports = mongoose.model('Inbox', InboxSchema);