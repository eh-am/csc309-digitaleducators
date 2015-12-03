'use strict';

angular.module('digitaleducatorsApp')
  .controller('AdminCtrl', function ($scope, $http, $uibModal, Auth, User, Flash) {

    // Info about admin
    $scope.me = User.get();
    
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    // Get reviews
    $http.get('/api/reviews/').success(function (reviews){
      $scope.reviews = reviews;
    });

    $scope.getStars = function(rating) {
      var r = rating;
      if (isNaN(rating)) r = 0;

      return (new Array(parseInt(r)));
    }

    $scope.getEmptyStars = function(rating) {
      var r = rating;
      if (isNaN(rating)) r = 0;

      return (new Array(parseInt(5-r)));
    }

    // Get questions
    $http.get('/api/questions/').success(function (questions){
      $scope.questions = questions;
    });

    // Edit an user
    $scope.editUser = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalEditUser.html',
        controller: 'EditModalCtrl',
        size: 'lg',
        resolve: {
          userinfo: function(){
            return angular.copy(user);
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
    $scope.editRole = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalEditRole.html',
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
    $scope.deleteUser = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalDeleteUser.html',
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

    // Edit a review
    $scope.editReview = function(review) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalEditReview.html',
        controller: 'EditReviewModalCtrl',
        size: 'lg',
        resolve: {
          reviewinfo: function(){
            return angular.copy(review);
          }
        }
      });

      modalInstance.result.then(function (result) {
        var info = {
          _id: review._id,
          rating: result.rating,
          review: result.review
        };

        $http.put('/api/reviews/'+review._id, info)
        .then(function (){
          Flash.create('success', 'Review successfully changed.', 'flash-message');
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };

    // Delete a review
    $scope.deleteReview = function(review) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalDeleteReview.html',
        controller: 'DeleteReviewModalCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        $http.delete('/api/reviews/'+review._id)
        .then(function (){
          angular.forEach($scope.reviews, function(r, i) {
            if (r === review) {
              $scope.reviews.splice(i, 1);
            }
          });
          Flash.create('success', 'Review deleted.', 'flash-message');
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };

    // Edit a question
    $scope.editQuestion = function(question) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalEditQuestion.html',
        controller: 'EditQuestionModalCtrl',
        size: 'lg',
        resolve: {
          questioninfo: function(){
            return angular.copy(question);
          }
        }
      });

      modalInstance.result.then(function (result) {
        var info = {
          title: result.title,
          text: result.text,
          tags: result.tags
        };

        $http.put('/api/questions/'+question._id, info)
        .then(function (){
          Flash.create('success', 'Question successfully changed.', 'flash-message');
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };

    // Delete a question
    $scope.deleteQuestion = function(question) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/admin/modal/modalDeleteQuestion.html',
        controller: 'DeleteQuestionModalCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        $http.delete('/api/questions/'+question._id)
        .then(function (){
          angular.forEach($scope.questions, function(q, i) {
            if (q === question) {
              $scope.questions.splice(i, 1);
            }
          });
          Flash.create('success', 'Question deleted.', 'flash-message');
        })
        .catch(function (){
          Flash.create('danger', 'An error occurred.', 'flash-message');
        });
      });
    };
  });

// Controller for user edit modal
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

// Controller for user role/privileges modal
angular.module('digitaleducatorsApp').controller('RoleModalCtrl', function ($scope, $uibModalInstance, newrole) {
  $scope.newrole = newrole;

  $scope.yes = function () {
    $uibModalInstance.close($scope.newrole);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});

// Controller for user delete modal
angular.module('digitaleducatorsApp').controller('DeleteModalCtrl', function ($scope, $uibModalInstance) {
  $scope.yes = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});

// Controller for review edit modal
angular.module('digitaleducatorsApp').controller('EditReviewModalCtrl', function ($scope, $uibModalInstance, reviewinfo) {
  $scope.reviewinfo = reviewinfo;
  $scope.max = 5;

  $scope.editReview = function () {
    $uibModalInstance.close($scope.reviewinfo);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };
});

// Controller for review delete modal
angular.module('digitaleducatorsApp').controller('DeleteReviewModalCtrl', function ($scope, $uibModalInstance) {
  $scope.yes = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});

// Controller for question edit modal
angular.module('digitaleducatorsApp').controller('EditQuestionModalCtrl', function ($scope, $uibModalInstance, questioninfo) {
  $scope.questioninfo = questioninfo;
  var tags = [ ];

  angular.forEach(questioninfo.tags, function(tag, i) {
    tags.push({ name: tag });
  });

  tags.push({ name: '' });
  $scope.questioninfo.tags = tags;

  $scope.editQuestion = function () {
    var tagsArray = [];
    cleanEmptyTags().map(function(value){
      tagsArray.push(value.name);
    });
    $scope.questioninfo.tags = tagsArray;
    $uibModalInstance.close($scope.questioninfo);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };

  $scope.addTag = function($event){
    $event.preventDefault;

    $scope.questioninfo.tags = cleanEmptyTags();
    $scope.questioninfo.tags.push({ name: '' });
  };

  function cleanEmptyTags(){
    return $scope.questioninfo.tags.filter(function (tag){
      if (tag.name.length <= 0) return false;
      return true;
    });
  }
});

// Controller for question delete modal
angular.module('digitaleducatorsApp').controller('DeleteQuestionModalCtrl', function ($scope, $uibModalInstance) {
  $scope.yes = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };
});
