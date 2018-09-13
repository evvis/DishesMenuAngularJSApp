'use strict';

angular.module('dishesApp', ['ui.bootstrap'])
    .controller('DishesList', ['$scope', '$http', function($scope, $http) {
        $http.get('/menu.json').success(function (data) {
            $scope.dishes = data;
        });

        $scope.sortField = undefined;
        $scope.reverse = false;

        $scope.sort = function (fieldName) {
            if ($scope.sortField === fieldName){
                $scope.reverse = !$scope.reverse;
            } else {
                $scope .sortField = fieldName;
                $scope.reverse = false;
            }
        };
        $scope.isSortUp = function (fieldName) {
            return $scope.sortField === fieldName && !$scope.reverse;
        };
        $scope.isSortDown = function (fieldName) {
            return $scope.sortField === fieldName && $scope.reverse;
        };
    }]);

