'use strict';

angular.module('digitaleducatorsApp')
  .controller('ApplyForHelpCtrl', function ($scope, $http, $location, $uibModal, Flash, Auth, $uibModalInstance, applyForHelpService) {

      //TODO: change for real values
      $scope.maxCoins = 10;
      $scope.minCoins = 1;


      // // the default price
      $scope.price = parseInt(($scope.maxCoins + $scope.minCoins) / 2);

      $scope.submit = function($event){
        $event.preventDefault();
        $uibModalInstance.dismiss();

        $http.post('/api/questions/applyForHelp', {
          questionId : applyForHelpService.getQuestion()._id,
          price: $scope.price
        }).success(function (data, status){
          console.log(data);
          Flash.create('success', "You applied successfully to help this person", 'flash-message');         
        });
        
      };

  });
