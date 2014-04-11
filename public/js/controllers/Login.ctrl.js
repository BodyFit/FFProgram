define(['./module'], function(module) {
    module.controller('LoginCtrl', ['$scope', 'loginService',
        function($scope, loginService) {
        	$scope.login = function() {
    			loginService
        			.login($scope.user, $scope.pass, $scope.remember)
        			.success(function(loginResult) {
        				$scope.result = loginResult;
        			});
        	}
        }
    ]);
});