'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyquestionsCtrl', function ($scope, $http) {
    

    $http.post('/api/questions/myQuestions').success(function (questions){
      $scope.questionStatus = "all";
      $scope.myQuestions = questions;
    });

  });
