'use strict';

describe('Controller: AddAmountCtrl', function () {

  // load the controller's module
  beforeEach(module('billSplitterClientApp'));

  var AddAmountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddAmountCtrl = $controller('AddAmountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
