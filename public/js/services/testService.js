define(['./module'], function(services) {
    services.factory('$testService', ['$http',
        function($http) {
            return {
                'getItems': function() {
                    return $http.get('/api/list');
                }
            };
        }
    ]);
});