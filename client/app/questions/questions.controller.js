'use strict';

angular.module('ddApp')
  .controller('QuestionsCtrl', function ($scope, $http, socket) {
    $scope.newQuestion = '';

    $http.get('/api/questions').success(function (questions){
      $scope.questions = questions;
    });

    $scope.addComment = function(){
      $http.post('/api/questions', { text: $scope.newQuestion });
      $scope.newQuestion = "";
    }
  });
