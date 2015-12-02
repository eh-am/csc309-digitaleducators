'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  rating: {
  	type: Number,
  	min: 0,
  	max: 5
  },
  review: String,
  date: {
  	type: Date,
  	default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewer : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Review', ReviewSchema);