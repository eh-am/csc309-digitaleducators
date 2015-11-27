'use strict';

var _ = require('lodash');
var Question = require('./question.model');
var User = require('../user/user.model');

// Get list of questions
exports.index = function(req, res) {
  Question
    .find({})
    .populate('author') // kinda like sql's join
    .populate('helper') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { return handleError(res, err); }
      return res.status(200).json(questions);
    });
};

exports.getOpenQuestions = function(req, res){
  Question
    .find({"status" : "open"})
    .populate('author') // kinda like sql's join
    .populate('helper') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { return handleError(res, err); }
      return res.status(200).json(questions);
    });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {

  // lodash merge
  // merge two objects into one
  var question = new Question( _.merge({ 
    author: req.user._id
  }, req.body));

  question.save(function (err, comment){
    if(err) { return handleError(res, err); }
    return res.status(201).json(question);
  });
  
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};



exports.applyForHelp = function(req, res){
  Question.findById(req.body.questionId, function (err, question) {
    var applicants = [{
      user: req.user._id, 
      price: req.body.price      
    }];

    var updated = question;

    // concat the old applicants with the new one
    updated.applicants = applicants.concat(updated.applicants);
    

    updated.save(function (err) {
      if (err) { return handleError(res, err);}

      return res.status(200).json(question);
    });

  });
};

exports.myQuestions = function(req, res){
  // return the questions
  // of the logged in user
  Question
    .find({ "author" : req.user._id})
    .populate('author') // kinda like sql's join
    .populate('helper') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(questions);
    });
};

exports.myHelps = function(req, res){
  // return the Helps
  // of the logged in user

  //db.questions.find({ "applicants" : {$elemMatch : { user: "ID_USER"  }}})

  Question
    .find()
    .elemMatch("applicants", { user: req.user._id })
    .populate('author') // kinda like sql's join
    .populate('helper') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(questions);
    });
};

exports.acceptHelpFrom = function(req, res){

  Question.findById(req.body.questionId, function (err, question) {
    var updated = question;

    // the helper is the applicantId
    updated.price = req.body.price;
    updated.helper = req.body.applicantId;
    // question now is "in progress"
    updated.status = 'in progress';

    updated.save(function (err) {
      if (err) { return handleError(res, err);}

      return res.status(200).json(question);
    });

  });
};



// when the user has been helped
// deducts the user balance
// and increases the helper balance
exports.endHelp = function(req, res){
    Question
      .findOne({_id: req.body.questionId})
      .populate('author') // kinda like sql's join
      .populate('helper') // kinda like sql's join
      .populate('applicants.user') // kinda like sql's join
      .exec(
    function (err, question) {
      console.log("sou uma questao")
      console.log(question);

      var updated = question;

      console.log("updated helper");
      console.log(question.helper);


      updated.status = 'closed';

      updated.save(function (err) {
        if (err) { return handleError(res, err);}

        User.findById(req.user._id, function(err, user){
          var updatedOwner = user;

          // new user balance is current balance
          // minus price of the question
          updatedOwner.balance = user.balance - question.price;

          //save owner's balance
          updatedOwner.save(function (err){
            if (err) { return handleError(res, err);}          


            User.findById(question.helper, function(err, helper){
              var updatedHelper = helper;
              updatedHelper.balance = helper.balance + question.price;

              //save helper's balance
              updatedHelper.save(function(err){
                if (err) { return handleError(res, err);}          
                return res.status(200).json(question);

              });
            });
          })
        });
      
      });
  }

    );


}


function handleError(res, err) {
  return res.status(500).send(err);
}