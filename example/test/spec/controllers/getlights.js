'use strict';

describe('Controller: GetLightsCtrl', function () {

  // load the controller's module
  beforeEach(module('exampleApp'));

  var GetLightsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetLightsCtrl = $controller('GetLightsCtrl', {
      $scope: scope
    });
  }));

});
