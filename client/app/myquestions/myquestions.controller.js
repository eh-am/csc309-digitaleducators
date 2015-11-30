'use strict';

angular.module('digitaleducatorsApp')
  .controller('MyquestionsCtrl', function ($scope, $http, $location, $uibModal, Flash, Auth) {
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

        console.log("criei inbox");
        console.log(inbox);
        loadQuestions();
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

              Flash.create('success', "You ended your help session successfully.", 'flash-message');
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
