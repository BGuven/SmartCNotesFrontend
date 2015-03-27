'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('NotesCtrl', function ($scope,$http, notes) {
    $scope.notes = notes.data;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
