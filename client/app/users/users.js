'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      });
    $stateProvider
      .state('oneUser', {
        url: '/users/:id',
        templateUrl: 'app/users/oneUser.html',
        controller: 'UsersCtrl'
      });
  });