'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('MainCtrl', function ($scope, problems, $http, $rootScope) {
    $scope.problems = problems.data;
    $scope.appendPlan = function(id){
      var api = 'http://localhost:3000/problems/' + id;
      $http.get(api)
        .success(function(data){
          $scope.pickedPlan = data;
        })
        .error(function(data){
          $scope.pickedPlan = data;
        }).then(function(){
          var cause = $scope.pickedPlan.cause || $scope.pickedPlan.cause_desc ;
          var templateAdded = $scope.pickedPlan.name + " Cause -> " + cause + "\n" +
                              $scope.pickedPlan.name + " dx -> " + $scope.pickedPlan.dx + "\n" +
                              $scope.pickedPlan.name + " tx -> " + $scope.pickedPlan.tx + "\n" +
                              $scope.pickedPlan.name + " prognosis -> " + $scope.pickedPlan.prognosis + "\n";
          $rootScope.$broadcast('add', templateAdded);
        });
    };

    $scope.$watch ('selectedProblem', function(newVal, oldVal){
      console.log(newVal, oldVal);
      if (newVal && newVal.originalObject){
        $scope.appendPlan(newVal.originalObject.id);
      }
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
