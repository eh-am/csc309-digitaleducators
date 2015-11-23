'use strict';

angular.module('digitaleducatorsApp')
  .controller('UsersCtrl', function ($scope, $http, $stateParams) {

    $http.get('/api/users').success(function (users){
      $scope.users = users;
    });

    if($stateParams.id){
    	var uri = '/api/users/'+$stateParams.id;

    	$http.get(uri).success(function (oneUser){
	      $scope.oneUser = oneUser;
	    });
    }

  });
