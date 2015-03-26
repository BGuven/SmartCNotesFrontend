'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('MainCtrl', function ($scope, problems) {
    $scope.problems = problems.data;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
