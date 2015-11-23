'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myHelps', {
        url: '/myhelps',
        templateUrl: 'app/myHelps/myHelps.html',
        controller: 'MyHelpsCtrl'
      });
  });