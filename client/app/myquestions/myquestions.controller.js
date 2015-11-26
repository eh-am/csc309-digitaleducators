'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyquestionsCtrl', function ($scope, $http, $location, $uibModal) {
    var loadQuestions = function(){
      $http.post('/api/questions/myQuestions').success(function (questions){
        $scope.questionStatus = "all";
        $scope.myQuestions = questions;
      });
    }

    loadQuestions();



    $scope.acceptHelpFrom = function (question, person){
      $http.post('/api/questions/acceptHelpFrom', {
        questionId: question._id,
        applicantId: person.user._id,
        price: person.price,
      }).success(function (question){
        loadQuestions();
        //TODO
        //show inbox?

      });

    };

    $scope.closeHelp = function(question){
      var modal = $uibModal.open({
        modal:{
          dismissable: true, 
        },        
        templateUrl: 'app/myquestions/modal/modalCloseQuestion.html',
        controller: function applyController($scope, $uibModalInstance, Auth){
          $scope.price = question.price;

          $scope.hasEnoughMoney = function(){
            if (Auth.getCurrentUser().balance >= $scope.price) return true;
            return false;
          }


          $scope.endHelp = function(){      
            $http.post('/api/questions/endHelp', {questionId : question._id}).success(function (question){
              $uibModalInstance.dismiss();
              loadQuestions();
              // TODO
              // show flash message
            });
            
          }
        }
      });
    }


    $scope.isQuestionOpen = function(question){
      if (question.status == "open") return true;
      return false;
    }



 

  });