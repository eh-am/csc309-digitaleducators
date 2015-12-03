/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Question = require('../api/question/question.model');
var Inbox = require('../api/inbox/inbox.model');



Inbox.find({}).remove(function (){
  console.log("Cleaned up inbox collection");  
});


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {


      console.log('finished populating users');

      // console.log("creating one question");
      // User.findOne({'email': 'admin@admin.com'}, function(err, obj){
      //   Question.find({}).remove(function(){
      //   Question.create({
      //     title: "I can't download a youtube video!",
      //     text: "I've been struggling with this issue since last month (..) Integer lacinia turpis neque, sit amet ultricies ex ornare ut. Nulla porttitor, ante eget vulputate suscipit, justo magna ullamcorper elit, a ullamcorper est enim eu augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse at finibus elit. Donec non euismod metus. Morbi auctor magna in sapien facilisis placerat. Sed varius iaculis metus quis lacinia. Etiam vitae bibendum tellus.",
      //     author: obj._id,
      //     tags: ["Youtube", "Internet", "Video"]
      //   });
      // });

      // });
    }
  );
});


