
'use strict';

angular.module('digitaleducatorsApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket, $uibModal, Flash, Auth) {
    $scope.newQuestion = '';
    $scope.tags = [{ name: '' }];
    $scope.currentUser = Auth.getCurrentUser();
console.log($scope.currentUser);


    



    $http.get('/api/questions/getOpenQuestions').success(function (questions){
      $scope.questions = questions;
      $scope.addSpecialties();   
    });

    $scope.filterAreas = function(question){
      // if there's no question, do nothing
      if (!question){ return false; }
      // a user can't see his own question
      if ($scope.currentUser._id == question.author._id){ return false; }


      if ($scope.searchAreas === "") return true;
      var isMatch = false;

      var parts = $scope.searchAreas.split(' ');

      parts.forEach(function(part){
        if (new RegExp(part.toUpperCase()).test(question.tags.join("").toUpperCase())){
          isMatch = true;
        };

      });

      return isMatch;
    };

    $scope.showAll = function(){
      $scope.searchAreas = "";
    }

    $scope.addSpecialties = function(){
      $scope.searchAreas = Auth.getCurrentUser().areas.filter(function(area){ return area.name == "" ? false : true}).map(function (area){
        return area.name;
      }).join(" ");
    }


    // checks if the person is owner of the question
    // a user can't respond his/hers own question
    $scope.isOwner = function(question){
      if ($scope.$parent.getCurrentUser()._id == question.author._id){
        return true;
      }
      
      return false;
    }

    // if user already has applied to help
    // don't show the "apply to help" button
    $scope.hasAlreadyAppliedToHelp = function(question){
      var _id = $scope.$parent.getCurrentUser()._id;
      var match = false;
      question.applicants.forEach(function (applicant){
        if (_id == applicant.user._id){
          match = true;
        }
      });

      console.log("retornando " + match)
      return match;
    };

    $scope.applyForHelp = function(questionId){            
      var modal = $uibModal.open({
        modal:{
          dismissable: true, 
        },        
        templateUrl: 'app/questions/modal/applyModal.html',
        controller: function applyController($scope, $uibModalInstance){

          //TODO: change for real values
          $scope.maxCoins = 10;
          $scope.minCoins = 1;


          // the default price
          $scope.price = parseInt(($scope.maxCoins + $scope.minCoins) / 2);

          $scope.submit = function($event){
            $event.preventDefault();
            $uibModalInstance.dismiss();

            $http.post('/api/questions/applyForHelp', {
              questionId : questionId,
              price: $scope.price
            }).success(function (data, status){
              console.log(data);
              Flash.create('success', "You applied successfully to help this person", 'flash-message');         
            });
            
            //TODO
            //apply for help
          };
        },
      });
    };


  });
