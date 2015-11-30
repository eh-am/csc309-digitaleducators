'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InboxSchema = new Schema({
  // the person who is being helped
  question : {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  messages:[{
    message: String, //the actual message
    person : { // the person who said that
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postedAt: { type: Date, default: Date.now }, // when it was said
  }]
});

module.exports = mongoose.model('Inbox', InboxSchema);