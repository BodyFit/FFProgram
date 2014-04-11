define(['./module'], function(module) {
    module.controller('PageCtrl', ['$scope', '$rootScope',
        function($scope, $rootScope) {
        	$scope.title = "Food and Fitness app :: Home";
        	$scope.header = "Food and Fitness app / Home";
            $scope.menuItems = [{
                'title': 'Home',
                'uri': '/'
            }, {
                'title': 'Preferences',
                'uri': '/preferences'
            }];

            $rootScope.page = $scope;
        }
    ]);
});
