define(['./module'], function(module) {
    module.controller('PageCtrl', ['$scope', '$rootScope', 'loginService',
        function($scope, $rootScope, loginService) {
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

            $scope.updatePageInfo = function(pageTitle) {
                $scope.title = "Food and Fitness app :: " + pageTitle;
                $scope.header = "Food and Fitness app / " + pageTitle;
            }

            $rootScope.page = $scope;
        }
    ]);
});
