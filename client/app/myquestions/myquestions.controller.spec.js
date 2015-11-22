'use strict';

describe('Controller: MyquestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('digitaleducatorsApp'));

  var MyquestionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyquestionsCtrl = $controller('MyquestionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
