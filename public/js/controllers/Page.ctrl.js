define(['./module'], function(module) {
    module.controller('PageCtrl', ['$scope', '$rootScope', 'loginService',
        function($scope, $rootScope, loginService) {
        	$scope.title = "Food and Fitness app :: Home";
        	$scope.header = "Food and Fitness app / Home";
            $scope.menuItems = [{
                'title': 'Home',
                'uri': '/'
            }, {
                'title': 'Preferences',
                'uri': '/preferences'
            }];

            $scope.logout = function() {
                loginService.logout();
            };

            $rootScope.page = $scope;
        }
    ]);
});
