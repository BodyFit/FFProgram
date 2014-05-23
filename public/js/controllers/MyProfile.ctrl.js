define(['./module'], function(module) {
    module.controller('MyProfileCtrl', ['$scope',
        function($scope) {
        	$scope.height = 170;
        	$scope.birthDate = '2005-01-01';

        	$scope.validateSex = function(value) {
        		return value != "";
        	}

        	$scope.save = function() {
        		alert($scope.name);
        	};

			$scope.open = function($event) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.opened = !$scope.opened;
  			};
        }
    ]);
});