'use strict';

angular.module('digitaleducatorsApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $uibModal) {
    $scope.me = User.get();
    
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
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

angular.module('digitaleducatorsApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.yes = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});
