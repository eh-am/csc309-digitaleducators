'use strict';

angular.module('ddApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.newQuestion = '';

    $http.get('/api/questions').success(function (questions){
      $scope.questions = questions;
      console.log($scope.questions);
    });

    $scope.addComment = function(){
      $http.post('/api/questions', { text: $scope.newQuestion });
      $scope.newQuestion = "";

      $location.path('/questions');
      //TODO
      //redirect to the question
    }
  });
