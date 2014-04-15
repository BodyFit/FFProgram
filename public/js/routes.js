define(['angular', 'angular-route'],
    function(ng) {
        routes = ng.module('app.routes', ['ngRoute']);

        routes.config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/', {
                    templateUrl: 'preferences-template.html',
                    controller: 'PreferencesCtrl'
                    // templateUrl: 'home-view-template.html',
                    // controller: 'HomeCtrl'
                }).when('/login', {
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
                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function(event, next, current) {
                    if (!$rootScope.loginData || !$rootScope.loginData.loggedIn) {
                        // no logged user, we should be going to #login
                        if (next.templateUrl == "login-view-template.html") {
                            // already going to #login, no redirect needed
                        } else {
                            // not going to #login, we should redirect now
                            $location.path("/login");
                        }
                    }
                });
            }
        ]);
    }
);
