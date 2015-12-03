'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createquestion', {
        url: '/createquestion',
        templateUrl: 'app/createquestion/createquestion.html',
        controller: 'CreatequestionCtrl'
      });
  });