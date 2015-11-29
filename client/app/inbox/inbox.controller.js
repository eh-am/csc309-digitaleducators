'use strict';

angular.module('digitaleducatorsApp')
  .controller('InboxCtrl', function ($scope, $stateParams, $http, Auth) {
    $scope.inboxID = $stateParams.id;

    console.log("id desse inbox  " + $scope.inboxID);
    $http.get('/api/inbox/' + $scope.inboxID).success(function (inbox){
      $scope.inbox = inbox;   
      console.log("so vendo se esse inbox existe");
      console.log(inbox);
    });

    // $http.get('/api/questions/' + $scope.inboxID).success(function (question){
    //   $scope.question = question;   
    //   console.log(question);
    // });

    // TODO:
    // mover isso aqui criar na hora que fechar um acordo

    // $scope.create = function(){
    //   console.log("criando");
    //   $http.post('/api/inbox', {
    //     question: $scope.inboxID
    //   }).success(function (){
    //     console.log("deu certo a criagem");
    //   });      
    // };

    $scope.saySomething = function(event){
      event.preventDefault();

      
      $http.post('/api/inbox/' + $scope.inboxID, {
          _id: $scope.inbox._id,
          author: Auth.getCurrentUser()._id,
          message: "blalbalba"
      }).success(function(message){
        console.log("conseguiii criar mensagem");
        console.log(message);
      });
    }


  });
