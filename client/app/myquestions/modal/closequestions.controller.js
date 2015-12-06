'use strict';

angular.module('digitaleducatorsApp')
  .controller('CloseQuestionsCtrl', function ($scope, $http, $location, $uibModal, Flash, Auth, closeQuestion) {
    $scope.question = closeQuestion.getQuestion();
    $scope.price = $scope.question.price;

    $scope.hasEnoughMoney = function(){
      if (Auth.getCurrentUser().balance >= $scope.price) return true;
      return false;
    }


    $scope.endHelp = function(){      
      $http.post('/api/questions/endHelp', {questionId : $scope.question._id}).success(function (question){
        $uibModalInstance.dismiss();
        loadQuestions();

        Flash.create('success', "You ended your help session successfully." + 
          "<a href='/users/"+ question.helper._id + "'>How about revewing this person?</a> ", 'flash-message');
      });
      
    }

  });
