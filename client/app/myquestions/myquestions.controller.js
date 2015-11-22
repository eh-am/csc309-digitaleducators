'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyquestionsCtrl', function ($scope, $http, $location) {
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

    $scope.isQuestionOpen = function(question){
      if (question.status == "open") return true;
      return false;
    }



 

  });
