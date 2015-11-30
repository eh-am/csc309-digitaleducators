'use strict';

angular.module('digitaleducatorsApp')
  .controller('UsersCtrl', function ($scope, $http, $stateParams, User) {

    //Get all users
    $http.get('/api/users').success(function (users){
      $scope.users = users;
    });

    //Get one user, if it's a profile page
    if($stateParams.id){
    	var uri = '/api/users/'+$stateParams.id;

    	$http.get(uri).success(function (oneUser){
	      $scope.oneUser = oneUser;
	    });
    }

    //All users: sorting
    $scope.sortKey = 'name';
    $scope.reverse = false;

    $scope.sort = function(key){
      $scope.sortKey = key;
      $scope.reverse = !$scope.reverse;
    }

    //Stuff for reviews and ratings
    $scope.isCollapsed = true;
    $scope.myrate = 0;
    $scope.max = 5;
    $scope.me = User.get();
    $scope.errors = {};

    //Get statistics for all users
    $http.get('/api/reviews/statistics/all').success(function (users_stats){
      $scope.users_stats = users_stats;
    });

    $scope.searchStatistics = function(userid) {
      var result = false;

      angular.forEach($scope.users_stats, function(oneStat) {
        if(oneStat._id == userid) {
          return result = oneStat;
        }
      });

      return result;
    };

    if($stateParams.id){
      var uri = '/api/reviews/user/'+$stateParams.id;
      var uri_stat = '/api/reviews/statistics/'+$stateParams.id;

      $http.get(uri).success(function (reviews){
        $scope.reviews = reviews;
      });

      $http.get(uri_stat).success(function (statistics){
        $scope.statistics = statistics[0];
      });
    }

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
    };

    $scope.reviewUser = function(){
      $http.post('/api/reviews', {
        rating: $scope.myrate,
        review: $scope.myreview,
        user: $stateParams.id,
        reviewer: $scope.me._id
      }).then(function successCallback(response) {
        $scope.reviewmessage = 'Review created!';
        $scope.errors.myreview = '';
      }, function errorCallback(response) {
        $scope.errors.myreview = 'An error occurred.';
      });
    };

    $scope.getStars = function(rating) {
        if(!rating)
          return (new Array(0));

        return (new Array(Math.round(rating)));
    }

    $scope.getEmptyStars = function(rating) {
        if(!rating)
          return (new Array(0));

        return (new Array(5-Math.round(rating)));
    }
  });
