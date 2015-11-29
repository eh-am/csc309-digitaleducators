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
  socket.emit('inbox:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('inbox:remove', doc);
}