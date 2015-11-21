'use strict';

angular.module('digitaleducatorsApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.me = User.get();

    $scope.changeProfileInfo = function(profileform) {
      $scope.profilesubmitted = true;

      var info = {
        name: $scope.me.name,
        location: $scope.me.location,
        description: $scope.me.description
      };

      if(profileform.$valid) {
        Auth.changeProfileInfo(info)
        .then( function() {
          $scope.profilemessage = 'Profile info successfully changed.';
        })
        .catch( function() {
          profileform.$setValidity('mongoose', false);
          $scope.errors.profile = 'An error occurred.';
          $scope.profilemessage = '';
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
