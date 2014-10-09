'use strict';

describe('Controller: ConfigappCtrl', function () {

  // load the controller's module
  beforeEach(module('exampleApp'));

  var ConfigappCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigappCtrl = $controller('ConfigappCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
