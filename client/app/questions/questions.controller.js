
'use strict';

angular.module('digitaleducatorsApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket, $uibModal) {
    $scope.newQuestion = '';
    $scope.tags = [{ name: '' }];

    $http.get('/api/questions').success(function (questions){
      $scope.questions = questions;      
    });

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

            });
            
            //TODO
            //apply for help
          };
        },
      });
    };


    $scope.addComment = function(){
      var tagsArray = [];
      cleanEmptyTags().map(function(value){
        tagsArray.push(value.name);
      });

      $http.post('/api/questions', {
        title: $scope.title,
        text: $scope.newQuestion,
        tags: tagsArray
      });
      $scope.newQuestion = "";
      $scope.tags = [{ name: '' }];


      $location.path('/myquestions');
      //TODO
      //redirect to the question
    };

    $scope.addTag = function($event){
      $event.preventDefault;

      $scope.tags = cleanEmptyTags();
      $scope.tags.push({
        name: ''
      });

    };

    // checks if the person is owner of the question
    // a user can't respond his/hers own question
    $scope.isOwner = function(question){
      if ($scope.$parent.getCurrentUser()._id == question.author._id){
        return true;
      }
      
      return false;
    }

    function cleanEmptyTags(){
      return $scope.tags.filter(function (tag){
        if (tag.name.length <= 0) return false;
        return true;
      });
    }

  });
