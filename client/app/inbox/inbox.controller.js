'use strict';

angular.module('digitaleducatorsApp')
  .controller('InboxCtrl', function ($scope, $stateParams, $http, Auth) {
    $scope.inboxID = $stateParams.id;

    updateMessages();

    function updateMessages(){
      $http.get('/api/inbox/' + $scope.inboxID).success(function (inbox){
        $scope.inbox = inbox;   
        console.log("so vendo se esse inbox existe");
        console.log(inbox);
      });      
    }

    $scope.saySomething = function(event){
      event.preventDefault();

      
      $http.post('/api/inbox/' + $scope.inboxID, {
          _id: $scope.inbox._id,
          author: Auth.getCurrentUser()._id,
          message: $scope.newMessage
      }).success(function(message){
        updateMessages();
      });
    }


  });
