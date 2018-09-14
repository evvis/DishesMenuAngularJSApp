'use strict';

angular.module('dishesApp', ['ui.bootstrap'])
    .controller('DishesList', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log) {
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

        $scope.modalUpdate = function (dish) {
            var modalInstance = $uibModal.open({
                templateUrl: 'itemIngridients.html',
                controller: function ($scope, dish) {
                    $scope.dish = dish;
                },
                resolve: {
                    dish: function () {
                        return dish;
                    }
                }
            });
            modalInstance.result.then(function (dish) {
                $scope.selected = dish;
                console.log(dish);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);
