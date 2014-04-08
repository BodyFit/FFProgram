 define(['./module'], function(controllers) {
     'use strict';
     controllers.controller('TestCtrl', ['$scope', '$testService',
         function($scope, $testService) {
             $scope.defaultString = "This is some test text";
             $scope.doSth = function() {
                 $scope.result = $scope.defaultString + $scope.inputBox;
             };

             $scope.getItems = function() {
                 $testService.getItems().success(function(data) {
                     $scope.items = data;
                     $scope.$watch('items', function() {
                         $scope.updateItemsCount();
                     }, true);
                 });
             };
             $scope.updateItemsCount = function() {
                 var count = 0;

                 angular.forEach($scope.items, function(item) {
                     if (item.isChecked == true) {
                         count++;
                     }
                 });

                 $scope.checkedItems = count;
             };

             $scope.updateItemsCount();
         }
     ]);
 });
