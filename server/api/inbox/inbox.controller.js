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
  console.log("body criando um inbox");
  console.log(req.body);
  Inbox.create(req.body, function(err, inbox) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(inbox);
  });
};

exports.addMessage = function(req, res) {
  // send via post:
  // req.body.message
  // req.body._id
  // req.body.author
  console.log("id " + req.body._id);
  console.log("message " + req.body.message);
  console.log("author " + req.body.author);


  Inbox.findByIdAndUpdate(req.body._id,
    {
      $push: {
        "messages": {
          message : req.body.message,
          author: req.body.author
        }
      }
    },
    {
      new: true,
    },    
    function(err, inbox) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(inbox);
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