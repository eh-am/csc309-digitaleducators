
'use strict';

angular.module('digitaleducatorsApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket, $uibModal, Flash, Auth, applyForHelpService) {
    $scope.newQuestion = '';
    $scope.tags = [{ name: '' }];
    $scope.currentUser = Auth.getCurrentUser();
    



    $http.get('/api/questions/getOpenQuestions').success(function (questions){
      $scope.questions = questions;
      $scope.addSpecialties();   
      $scope.currentUser = Auth.getCurrentUser();      
    });

    $scope.filterAreas = function(question){
      // if there's no question, do nothing
      if (!question){ return false; }

      // a user can't see his own question
      if (Auth.getCurrentUser() && Auth.getCurrentUser()._id == question.author._id){ return false; }


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
      if (!Auth.getCurrentUser().areas) return;

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

      return match;
    };

    $scope.applyForHelp = function(question){            
      
      applyForHelpService.setQuestion(question);

      var modal = $uibModal.open({
        modal:{
          dismissable: true, 
        },        
        templateUrl: 'app/questions/applymodal.html',
        controller: 'ApplyForHelpCtrl'
      });
    };


  });
