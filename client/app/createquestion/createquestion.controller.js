'use strict';

angular.module('digitaleducatorsApp')
  .controller('CreatequestionCtrl', function ($scope, $http, $location, socket, $uibModal, Flash, Auth) {
    $scope.tags = [{ name: '' }];

    $scope.addQuestion = function(){
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
      Flash.create('success', "You asked for help successfully.", 'flash-message');
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



    function cleanEmptyTags(){
      return $scope.tags.filter(function (tag){
        if (tag.name.length <= 0) return false;
        return true;
      });
    }

  });
