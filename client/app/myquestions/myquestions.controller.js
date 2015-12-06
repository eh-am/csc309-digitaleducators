'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyquestionsCtrl', function ($scope, $http, $location, $uibModal, Flash, Auth, closeQuestion) {
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
      }).then(function (q){

        // create an inbox for them
        return $http.post('/api/inbox', {
          helper: person.user._id,
          question: question._id
        });


      }).then(function (inbox){
        Flash.create('success', "You have accepted help from "
          + person.user.name + " successfully.", 'flash-message');

        loadQuestions();
      });

    };

    $scope.closeHelp = function(question){
      closeQuestion.setQuestion(question);
      var modal = $uibModal.open({
        modal:{
          dismissable: true, 
        },        
        templateUrl: 'app/myquestions/modal/modalCloseQuestion.html',
        controller: 'CloseQuestionsCtrl'
      });
    }


    $scope.isQuestionOpen = function(question){
      if (question.status == "open") return true;
      return false;
    }



 

  });
