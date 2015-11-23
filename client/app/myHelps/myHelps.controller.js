'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyHelpsCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $http.post('/api/questions/myHelps').success(function (helps){
      $scope.myHelps = helps;
      $scope.helpsStatus = "all";
    });


    $scope.filterQuestion = function(question){
      var filter = false;

      // if the status is "applied", search if the
      // current user applied to help this person
      if ($scope.helpsStatus == "applied"){
        question.applicants.forEach(function (q){
          if (q.user._id === $scope.$parent.getCurrentUser()._id){
            filter = true;
          }
        });
      } else {
        if (question.status === $scope.helpsStatus){
          filter = true;
        }
      }

      return filter;
    }

  });
