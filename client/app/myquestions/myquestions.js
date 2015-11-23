'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myquestions', {
        url: '/myquestions',
        templateUrl: 'app/myquestions/myquestions.html',
        controller: 'MyquestionsCtrl'
      });
  });