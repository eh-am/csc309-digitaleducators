'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('faq', {
        url: '/faq',
        templateUrl: 'app/faq/faq.html',
        controller: 'FaqCtrl'
      });
  });