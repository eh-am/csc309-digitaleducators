'use strict';

describe('Service: applyForHelpService', function () {

  // load the service's module
  beforeEach(module('digitaleducatorsApp'));

  // instantiate service
  var applyForHelpService;
  beforeEach(inject(function (_applyForHelpService_) {
    applyForHelpService = _applyForHelpService_;
  }));

  it('should do something', function () {
    expect(!!applyForHelpService).toBe(true);
  });

});
