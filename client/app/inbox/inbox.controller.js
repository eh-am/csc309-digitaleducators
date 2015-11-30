'use strict';

angular.module('digitaleducatorsApp')
  .controller('InboxCtrl', function ($scope, $stateParams, $http, Auth, socket) {
    $scope.inboxID = $stateParams.id;

    updateMessages();

    function updateMessages(){
      $http.get('/api/inbox/' + $scope.inboxID).success(function (inbox){
        $scope.inboxes = new Array(inbox);
        $scope.inbox = inbox;


        socket.syncUpdates('inbox', $scope.inboxes, function(event, inbox, inboxes){
          $scope.inbox = inbox;
        });
      });      
    }


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('inbox');
    });

    $scope.saySomething = function(event){
      event.preventDefault();

      
      $http.post('/api/inbox/' + $scope.inboxID, {
          _id: $scope.inbox._id,
          author: Auth.getCurrentUser()._id,
          message: $scope.newMessage
      }).success(function(message){
        $scope.newMessage = "";
      });
    }
  });
