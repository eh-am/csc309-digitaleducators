'use strict';

angular.module('ddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
      $stateProvider
      .state('createQuestions', {
        url: '/createquestions',
        templateUrl: 'app/questions/createquestions.html',
        controller: 'QuestionsCtrl',
      });
  });