define(['angular', 'angular-route'],
    function(ng) {
        routes = ng.module('app.routes', ['ngRoute']);

        routes.config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/', {
                    templateUrl: 'login-view-template.html',
                    controller: 'LoginCtrl'
                }).when('/login', {
                    redirectTo: '/'
                }).when('/preferences', {
                    templateUrl: 'preferences-template.html',
                    controller: 'PreferencesCtrl'
                }).otherwise({
                    redirectTo: '/'
                })
            }
        ]);
    });
