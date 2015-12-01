'use strict';

angular.module('digitaleducatorsApp')
  .controller('AdminCtrl', function ($scope, $http, $uibModal, Auth, User, Flash) {
    // Info about admin
    $scope.me = User.get();
    
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    // Edit an user
    $scope.edit = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalEdit.html',
        controller: 'EditModalCtrl',
        size: 'lg',
        resolve: {
          userinfo: function(){
            return user;
          }
        }
      });

      modalInstance.result.then(function (result) {
        var info = {
          _id: user._id,
          name: result.name,
          location: result.location,
          description: result.description,
          skype: result.skype,
          areas: result.areas,
          newPassword: result.newPassword
        };

        $http.put('/api/users/'+user._id, info)
        .then(function (){
          Flash.create('success', 'User info successfully changed.', 'flash-message');
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };

    // Switch user privileges
    $scope.role = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalRole.html',
        controller: 'RoleModalCtrl',
        size: 'sm',
        resolve: {
          newrole: function(){
            if(user.role == 'admin')
              return 'user';
            else
              return 'admin';
          }
        }
      });

      modalInstance.result.then(function (result) {
        var info = {
          _id: user._id,
          role: result,
        };

        $http.put('/api/users/'+user._id+'/role', info)
        .then(function (){
          Flash.create('success', 'User role successfully changed.', 'flash-message');
          angular.forEach($scope.users, function(u, i) {
            if (u === user) {
              $scope.users[i].role = result;
            }
          });
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };

    // Delete an user
    $scope.delete = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalDelete.html',
        controller: 'DeleteModalCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      });
    };
  });

// Controller for edit modal
angular.module('digitaleducatorsApp').controller('EditModalCtrl', function ($scope, $uibModalInstance, userinfo) {
  $scope.userinfo = userinfo;

  $scope.editUser = function () {
    $uibModalInstance.close($scope.userinfo);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };

  $scope.addArea = function($event){
    $event.preventDefault;

    $scope.userinfo.areas = cleanEmptyAreas();
    $scope.userinfo.areas.push({ name: '' });
  };

  function cleanEmptyAreas(){
    return $scope.userinfo.areas.filter(function (area){
      if (area.name.length <= 0) return false;
      return true;
    });
  }
});

// Controller for role/privileges modal
angular.module('digitaleducatorsApp').controller('RoleModalCtrl', function ($scope, $uibModalInstance, newrole) {
  $scope.newrole = newrole;

  $scope.yes = function () {
    $uibModalInstance.close($scope.newrole);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});

// Controller for delete modal
angular.module('digitaleducatorsApp').controller('DeleteModalCtrl', function ($scope, $uibModalInstance) {
  $scope.yes = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});
