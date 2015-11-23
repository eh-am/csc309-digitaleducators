/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Question = require('./question.model');

exports.register = function(socket) {
  Question.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Question.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) { 
  // Question
  // .find({ "author" : req.user._id})
  // .populate(doc, {path: 'author'}) // kinda like sql's join
  // .populate(doc, {path: 'helper'}) // kinda like sql's join
  // .populate(doc, {path: 'applicants.user'}) // kinda like sql's join
  // .exec(function(err, questions){
  //   if(err) { console.log(err); return handleError(res, err); }
  //   socket.emit('question:save', doc);
  // });

  // broadcast to client the question with the author attached
  Question.populate(doc, {path:'author', select: 'name'}, function(err, comment) {
    socket.emit('question:save', doc);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('question:remove', doc);
}