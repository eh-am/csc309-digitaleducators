'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'app/main/main.html',
      });
  });