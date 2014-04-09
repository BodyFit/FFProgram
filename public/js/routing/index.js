define(['./module'], function(routing) {
    routing.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'view1-template.html'
            }).when('/view2', {
                templateUrl: 'view2-template.html'
            }).otherwise({
                redirectTo: 'view1'
            })
        }
    ]);
});
