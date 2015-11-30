'use strict';

angular.module('digitaleducatorsApp')
  .controller('SettingsCtrl', function ($scope, $uibModal, User, Auth, Flash) {
    $scope.errors = {};
    $scope.me = User.get();

    $scope.changeProfileInfo = function(profileform) {
      $scope.profilesubmitted = true;

      //$scope.me.areas = cleanEmptyAreas();

      var info = {
        name: $scope.me.name,
        location: $scope.me.location,
        description: $scope.me.description,
        skype: $scope.me.skype,
        areas: $scope.me.areas
      };

      if(profileform.$valid) {
        Auth.changeProfileInfo(info)
        .then( function() {
          // $scope.profilemessage = 'Profile info successfully changed.';
          Flash.create('success', 'Profile info successfully changed.', 'flash-message');         
        })
        .catch( function() {
          profileform.$setValidity('mongoose', false);
          Flash.create('danger', 'An error occurred.', 'flash-message');         
          // $scope.errors.profile = 'An error occurred.';
          $scope.profilemessage = '';
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          // $scope.message = 'Password successfully changed.';
          Flash.create('success', 'Password successfully changed.', 'flash-message');         
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          Flash.create('danger', 'Incorrect password', 'flash-message');         
          // $scope.errors.other = 'Incorrect password';
          // $scope.message = '';
        });
      }
		};

    $scope.addArea = function($event){
      $event.preventDefault;

      $scope.me.areas = cleanEmptyAreas();
      $scope.me.areas.push({ name: '' });
    };

    function cleanEmptyAreas(){
      return $scope.me.areas.filter(function (area){
        if (area.name.length <= 0) return false;
        return true;
      });
    }
  });
