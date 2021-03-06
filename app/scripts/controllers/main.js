'use strict';

/**
 * @ngdoc function
 * @name smartCnotesFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartCnotesFrontendApp
 */
angular.module('smartCnotesFrontendApp')
  .controller('MainCtrl', function ($scope, problems, $http, $rootScope, ngDialog) {
    $scope.problems = problems.data;
    $scope.note = {};

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

    $scope.saveNote = function(name, patientName){
      $scope.note.name = name;
      $scope.note.patient_name = patientName;
      $http.post('http://localhost:3000/notes', {note: $scope.note}).
        success(function(data) {
          console.log(data);
        }).
        error(function(data) {
        });
    };

    $scope.saveInput = function(){
      ngDialog.open({
        template: '<input class="form-control" placeholder="Name your note" ng-model="name"/> <input class="form-control" placeholder="Patient Name" ng-model="patientName"/> <button class="btn btn-default" ng-if="name && patientName" ng-click="saveNote(name, patientName); closeThisDialog()">Save Note</button>',
        plain: true,
        scope: $scope
      });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
