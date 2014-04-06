 define(['./module'], function(controllers) {
     'use strict';
     controllers.controller('TestCtrl', ['$scope', '$http',
         function($scope, $http) {
             $scope.defaultString = "This is some test text";
             $scope.doSth = function() {
                 $scope.result = $scope.defaultString + $scope.inputBox;
             };

             $scope.getItems = function() {
                 $http.get('/api/list').success(function(data) {
                     $scope.items = data;
                 });
             };
         }
     ]);
 });
