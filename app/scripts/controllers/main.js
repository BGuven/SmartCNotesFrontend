'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('MainCtrl', function ($scope, problems, $http) {
    $scope.problems = problems.data;
    $scope.appendPlan = function(id){
      var api = 'http://localhost:3000/problems/' + id;
      $http.get(api)
        .success(function(data){
          $scope.pickedPlan = data;
        })
        .error(function(data){
          $scope.pickedPlan = data;
        });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
