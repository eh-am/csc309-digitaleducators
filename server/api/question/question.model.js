'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: String,
  text: String,
  date: { type: Date, default: Date.now },
  author : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // person who helped
  helper : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price: Number, // the price to get this question answered (which the applicant
                 // stated)

  applicants: [{
    price: Number,
    user: {  // people who applied to help
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],


  tags: [String],
  status: {
    type: String,
    enum: ['open', 'in progress', 'closed'],
    default: 'open'
  }
  
});

module.exports = mongoose.model('Question', QuestionSchema);