'use strict';

angular.module('liveChart', [
    'ngRoute',
    'restangular'
]).config(function($routeProvider, $locationProvider, RestangularProvider, Env) {
    $routeProvider

    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })

    .when('/temperature', {
        templateUrl: 'views/temperature.html',
        controller: 'TemperatureCtrl'
    });

    RestangularProvider.setBaseUrl(Env.baseUrl);
    RestangularProvider.setFullResponse(true);
});
