/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Inbox = require('./inbox.model');

exports.register = function(socket) {
  Inbox.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  Inbox.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}


function onSave(socket, doc, cb) {

    Inbox.findOne({ question : doc.question })
    .populate('question') 
    .populate('helped')
    .populate('helper')
    .populate('messages.author')
      .exec(function(err, inbox){
        if (!err){
          socket.emit('inbox:save', inbox);  
        }        
      });
}

function onRemove(socket, doc, cb) {
  socket.emit('inbox:remove', doc);
}