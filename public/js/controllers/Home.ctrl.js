define(['./module'], function(module) {
    module.controller('HomeCtrl', ['$scope',
        function($scope) {
          $scope.page.updatePageInfo('Home');
        }
    ]);
});