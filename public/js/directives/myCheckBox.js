define(['./module'], function(directives) {
    directives.directive('myCheckBox', [
        function() {
            // Runs during compile
            return {
                scope: {
                    'isChecked': '=',
                    'toggle': '&'
                },
                controller: function($scope) {
                    $scope.checkClicked = function() {
                        $scope.isChecked = !$scope.isChecked;
                    };
                    $scope.$watch('isChecked', function() {
                        $scope.toggle($scope.isChecked);
                    });
                    $scope.isChecked = false;
                },
                //template: '<div><span ng-click="checkClicked()"><i class="fa fa-check-square" ng-show="isChecked"></i><i class="fa fa-square" ng-show="!isChecked"></i></span> <div ng-transclude></div></div>',
                templateUrl: 'my-check-box-template',
                transclude: true
            };
        }
    ]);
});
