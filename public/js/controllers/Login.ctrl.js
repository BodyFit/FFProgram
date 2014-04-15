define(['./module'], function(module) {
    module.controller('LoginCtrl', ['$scope', '$location', '$routeParams', 'loginService',
        function($scope, $location, $routeParams, loginService) {
            $scope.page.updatePageInfo('Login');

        	$scope.login = function() {
    			loginService
        			.login($scope.user, $scope.pass, $scope.remember)
        			.then(function(loginResult) {
        				$scope.result = loginResult;
                        $location.path($routeParams.path);
        			});
        	}
        }
    ]);
});