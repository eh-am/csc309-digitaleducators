'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyHelpsCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $http.post('/api/questions/myHelps').success(function (helps){
      $scope.helps = helps;
      console.log(helps);
      
    });

  });
