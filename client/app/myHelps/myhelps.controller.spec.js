'use strict';

describe('Controller: MyHelpsCtrl', function () {

  // load the controller's module
  beforeEach(module('digitaleducatorsApp'));

  var MyHelpsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyHelpsCtrl = $controller('MyHelpsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
