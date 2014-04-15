define(['angular', 'angular-route'],
    function(ng) {
        routes = ng.module('app.routes', ['ngRoute']);

        routes.config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/', {
                    templateUrl: 'home-view-template.html',
                    controller: 'HomeCtrl'
                }).when('/login', {
                    redirectTo: '/login/%2F'
                }).when('/login/:path', {
                    templateUrl: 'login-view-template.html',
                    controller: 'LoginCtrl'
                }).when('/preferences', {
                    templateUrl: 'preferences-template.html',
                    controller: 'PreferencesCtrl'
                }).otherwise({
                    redirectTo: '/'
                })
            }
        ]);

        routes.run(['$location', '$rootScope',
            function($location, $rootScope) {
                $rootScope.$on("$routeChangeStart", function(event, next, current) {
                    if ((!$rootScope.loginData || !$rootScope.loginData.loggedIn) &&
                        next.originalPath.indexOf('/login') != 0) {
                        $location.path('/login/' + encodeURIComponent(next.originalPath));
                    }
                });
            }
        ]);
    }
);
