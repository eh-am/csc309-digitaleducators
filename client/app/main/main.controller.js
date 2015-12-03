'use strict';

angular.module('digitaleducatorsApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
