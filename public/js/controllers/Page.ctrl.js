define(['./module', 'angular'], function(module, ng) {
    module.controller('PageCtrl', ['$scope', '$rootScope', 'loginService',
        function($scope, $rootScope, loginService) {
            $scope.menuItems = [{
                'title': 'Home',
                'uri': '/'
            }, {
                'title': 'My Profile',
                'uri': '/my-profile'
            }, {
                'title': 'Preferences',
                'uri': '/preferences'
            }];

            $rootScope.$on("$routeChangeStart", function(event, next, current) {
                ng.forEach($scope.menuItems, function(item) {
                    if (next.originalPath.indexOf(item.uri) == 0) {
                        $scope.activeView = item;
                    }
                });
            });

            $scope.logout = function() {
                loginService.logout();
            };

            $scope.open = function() {
                $scope.isDatePickerOpened = true;
            }

            $rootScope.page = $scope;
        }
    ]);
});
