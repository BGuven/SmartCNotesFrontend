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
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
