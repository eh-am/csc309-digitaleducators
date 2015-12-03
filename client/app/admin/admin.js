'use strict';

angular.module('digitaleducatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          // redirect to home if is not an admin
          isAdmin: function(Auth, $location){
            if (!Auth.isAdmin()){
               $location.path('/');
            }
          }
        }
      });
  });