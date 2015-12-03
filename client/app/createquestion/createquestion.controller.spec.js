'use strict';

describe('Controller: CreatequestionCtrl', function () {

  // load the controller's module
  beforeEach(module('digitaleducatorsApp'));

  var CreatequestionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatequestionCtrl = $controller('CreatequestionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
