'use strict';

angular.module('dishesApp', [])
    .controller('DishesList', ['$scope', '$http', function($scope, $http) {
        $http.get('/menu.json').success(function (data, status, headers, config) {
            $scope.dishes = data;
        });
    }]);
