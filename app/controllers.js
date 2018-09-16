'use strict';

angular.module('dishesApp', ['ngStorage', 'ui.bootstrap'])
    .controller('DishesList', ['$scope', '$http', '$uibModal', '$log', '$localStorage',
        function($scope, $http, $uibModal, $log, $localStorage) {

        $http.get('/menu.json').success(function (data) {
            $scope.dishes = data;
        });

        $scope.resetAllStore = function () {
            $localStorage.$reset({
               sortField: undefined,
               reverse: false
            });
        };

        $scope.filtering = function () {
            $localStorage.filter = $scope.filtering;
        }

        $scope.sortField = $localStorage.sortField;
        $scope.reverse = $localStorage.reverse;

        $scope.sort = function (fieldName) {
            if ($scope.sortField === fieldName){
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortField = fieldName;
                $scope.reverse = false;
            }
            $localStorage.sortField = $scope.sortField;
            $localStorage.reverse = $scope.reverse;
        };
        $scope.isSortUp = function (fieldName) {
            return $scope.sortField === fieldName && !$scope.reverse;
        };
        $scope.isSortDown = function (fieldName) {
            return $scope.sortField === fieldName && $scope.reverse;
        };

        $scope.modalUpdate = function (dish) {
            var modalInstance = $uibModal.open({
                templateUrl: 'itemIngredients.html',
                controller: function ($scope, dish, $uibModalInstance) {
                    $scope.dish = dish;

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
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
    // .filter('filterByTitle', function () {
    //     return function (input) {
    //     }
    // });
