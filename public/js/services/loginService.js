define(['./module'], function(module) {
    module.factory('loginService', ['$http', '$rootScope', '$q',
        function($http, $rootScope, $q) {
            var loginData = {
                'loggedIn': true,
                'currentUser': null
            };
            $rootScope.loginData = loginData;

            return {
                login: function(user, pass, remember) {
                    loginData.loggedIn = true;
                    loginData.currentUser = {
                        'user': user
                    };
                    var deferred = $q.defer();
                    deferred.resolve(true);
                    return deferred.promise;
                    // if (!loginData.loggedIn) {
                    //     return $http.get('/api/login/' + user + '/' + pass + '/' + remember)
                    //         .success(function(result) {
                    //             loginData.loggedIn = true;
                    //             loginData.currentUser = {
                    //                 'user': result.user
                    //             };

                    //             return true;
                    //         });
                    //         // TODO: Return false on failure
                    // }
                    // // TODO: Return fullfilled promise
                },
                logout: function() {
                    loginData.loggedIn = false;
                    loginData.currentUser = null;
                }
            };
        }
    ]);
});
