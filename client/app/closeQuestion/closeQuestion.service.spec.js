'use strict';

describe('Service: closeQuestion', function () {

  // load the service's module
  beforeEach(module('digitaleducatorsApp'));

  // instantiate service
  var closeQuestion;
  beforeEach(inject(function (_closeQuestion_) {
    closeQuestion = _closeQuestion_;
  }));

  it('should do something', function () {
    expect(!!closeQuestion).toBe(true);
  });

});
