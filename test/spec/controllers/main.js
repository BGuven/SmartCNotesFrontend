'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('smartCnotesFrontendApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($httpBackend,$controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend.expectGET('http://localhost:3000/problems/1').respond({data:{id:10}});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      problems: {data: [{dx:'dx test 1', tx:'tx test 1'},{dx:'dx test 2', tx:'tx test 2'}]}
    });
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should assign the data to the problems in the scope', function(){
    expect(scope.problems).toEqual([{dx:'dx test 1', tx:'tx test 1'},{dx:'dx test 2', tx:'tx test 2'}]);
  });

  describe ('appendPlan()', function () {
    it('should return the valid problem the user clicks on', function(){
      scope.appendPlan(1);
      scope.$apply();
      expect(scope.pickedPlan).toEqual({id:10});
    });
  });
});
