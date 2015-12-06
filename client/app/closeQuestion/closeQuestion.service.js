'use strict';

angular.module('digitaleducatorsApp')
  .service('closeQuestion', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
    var question;

    var getQuestion = function(){
      return question;
    };
    var setQuestion = function(q){
      question = q;
    }

    return {
      getQuestion: getQuestion,
      setQuestion: setQuestion
    }
  });
