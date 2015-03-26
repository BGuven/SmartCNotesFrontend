'use strict';

/**
 * @ngdoc overview
 * @name smartCnotesFrontendApp
 * @description
 * # smartCnotesFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('smartCnotesFrontendApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angucomplete'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve:{
          problems: function($http){
            return $http.get('http://localhost:3000/problems');
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
