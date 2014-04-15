define(['./module'], function(module) {
    module.controller('PreferencesCtrl', ['$scope',
        function($scope) {
            $scope.page.updatePageInfo('Preferences');

            $scope.title = 'preferences';
        }
    ]);
});
