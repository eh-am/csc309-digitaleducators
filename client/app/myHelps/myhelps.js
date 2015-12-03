'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myHelps', {
        url: '/myhelps',
        templateUrl: 'app/myHelps/myhelps.html',
        controller: 'MyHelpsCtrl'
      });
  });