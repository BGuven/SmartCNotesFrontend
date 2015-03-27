'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:NotesCtrl
 * @description
 * # NoteShowCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('NoteShowCtrl', function ($scope,$http, note, problems, ngDialog,$rootScope, $routeParams) {
    $scope.problems = problems.data;
    $scope.note = note.data;

    var createTemplate = function(problem, spacing){
      return spacing + problem.name + " Cause -> " + problem.cause_desc + "\n" +
        spacing + problem.name + " dx -> " + problem.dx + "\n" +
        spacing + problem.name + " tx -> " + problem.tx + "\n" +
        spacing + problem.name + " prognosis -> " + problem.prognosis + "\n \n";
    };
    $scope.appendPlan = function(id){
      var api = 'http://localhost:3000/problems/' + id;
      $http.get(api)
        .success(function(data){
          $scope.pickedPlan = data;
        })
        .error(function(data){
          $scope.pickedPlan = data;
        }).then(function(){
          var cause_title;
          if ($scope.pickedPlan.cause.length > 0){
            cause_title = [];
            var cause_body = [];
            _.each($scope.pickedPlan.cause, function(item){
              cause_title.push(item.name);
              cause_body.push(createTemplate(item, "\t"));
            });
            cause_body = cause_body.join("\n");
            cause_title = cause_title.join(', ') + "\n" + cause_body;
          }
          else{
            cause_title = $scope.pickedPlan.cause_desc;
          }
          $scope.pickedPlan.cause_desc = cause_title;
          var templateAdded = createTemplate($scope.pickedPlan, "");
          $rootScope.$broadcast('add', templateAdded);
        });
    };

    $scope.$watch ('selectedProblem', function(newVal, oldVal){
      console.log(newVal, oldVal);
      if (newVal && newVal.originalObject){
        $scope.appendPlan(newVal.originalObject.id);
      }
    });

    $scope.updateNote = function(){
      var url = 'http://localhost:3000/notes/' + $routeParams.note_id;
      $http.put(url, {note: $scope.note}).
        success(function(data) {
          console.log(data);
        }).
        error(function(data) {
        });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
