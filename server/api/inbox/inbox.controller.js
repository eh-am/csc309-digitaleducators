'use strict';

var _ = require('lodash');
var Inbox = require('./inbox.model');

// Get list of inboxs
exports.index = function(req, res) {
  Inbox.find(function (err, inboxs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(inboxs);
  });
};

// Get a single inbox
// based on the id of the question
exports.show = function(req, res) {

  Inbox.findOne({ question : req.params.id })
    .populate('question') // kinda like sql's join
    .populate('helped') // kinda like sql's join
    .populate('helper') // kinda like sql's join
    .populate('messages.author') // kinda like sql's join
      .exec(function(err, inbox){
        if(err) { return handleError(res, err); }
        if(!inbox) { return res.status(404).send('Not Found'); }
        return res.json(inbox);
      });

  // Inbox.findOne({ question : req.params.id }, function (err, inbox) {
  //   if(err) { return handleError(res, err); }
  //   if(!inbox) { return res.status(404).send('Not Found'); }
  //   return res.json(inbox);
  // });
};

// Creates a new inbox in the DB.
exports.create = function(req, res) {
  Inbox.create({
    helped : req.user._id, // current user id
    helper : req.body.helper,
    question : req.body.question
  }, function(err, inbox) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(inbox);
  });
};

exports.addMessage = function(req, res) {
  // send via post:
  // req.body.message
  // req.body._id
  // req.body.author



// Can't use findByIdandUpdate 'cause mongoose doesn't have a
// middleware for update, so that socket.io can't emit a socket
// when something is updated.
// that way, we have to use findById then doc.save()

  Inbox.findById(req.body._id, function(err, doc){
    if(err) { return handleError(res, err); }

    // if the doc could be found
    if (doc){

      /* OBSERVATION  */
      /* i am not sure javascript's native push method is good enough */


      // add the new message
      doc.messages.push({
        message : req.body.message,
        author: req.body.author
      });

      // and save it!
      doc.save(function (err, inbox){
        if(err) { return handleError(res, err); }
        return res.status(201).json(inbox);
      });
    }
  });
};

// Updates an existing inbox in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Inbox.findById(req.params.id, function (err, inbox) {
    if (err) { return handleError(res, err); }
    if(!inbox) { return res.status(404).send('Not Found'); }
    var updated = _.merge(inbox, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(inbox);
    });
  });
};

// Deletes a inbox from the DB.
exports.destroy = function(req, res) {
  Inbox.findById(req.params.id, function (err, inbox) {
    if(err) { return handleError(res, err); }
    if(!inbox) { return res.status(404).send('Not Found'); }
    inbox.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}