'use strict';

angular.module('ddApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.newQuestion = '';
    $scope.tags = [{ name: '' }];


    $http.get('/api/questions').success(function (questions){
      $scope.questions = questions;
    });

    $scope.addComment = function(){
      $http.post('/api/questions', { text: $scope.newQuestion });
      $scope.newQuestion = "";

      $location.path('/questions');
      //TODO
      //redirect to the question
    };

    $scope.addTag = function($event){
      $event.preventDefault;

      for (var i = 0; i < $scope.tags.length; i++){
        if ($scope.tags[i].name.length <= 0){
          // go back one position, as now the array is 1 position shorter
          $scope.tags.splice(i--, 1);
        }
      }

      $scope.tags.push({
        name: ''
      });

    };

  });
