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
      $http.post('/api/questions', {
        text: $scope.newQuestion,
        tags: cleanEmptyTags()
      });
      $scope.newQuestion = "";
      $scope.tags = [{ name: '' }];

      $location.path('/questions');
      //TODO
      //redirect to the question
    };

    $scope.addTag = function($event){
      $event.preventDefault;

      $scope.tags = cleanEmptyTags();
      $scope.tags.push({
        name: ''
      });

    };

    function cleanEmptyTags(){
      return $scope.tags.filter(function (tag){
        if (tag.name.length <= 0) return false;
        return true;
      });
    }

  });
