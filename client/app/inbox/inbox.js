'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inbox', {
        url: '/inbox/:id',
        templateUrl: 'app/inbox/inbox.html',
        controller: 'InboxCtrl'
      });
  });