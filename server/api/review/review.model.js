'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  rating: {
  	type: Number,
  	min: 0,
  	max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  date: {
  	type: Date,
  	default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewer : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);