'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:BillCtrl
 * @description
 * # BillCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('BillCtrl', function ($scope, $rootScope, $routeParams, data) {
    $scope.edit = true;
    $scope.bill = {
      name: 'Loading...'
    };
    function updatePays() {
      var totalModifier = _.reduce($scope.bill.people, function(sum, person) {
        return sum + person.modifier;
      }, 0);
      _.each($scope.bill.people, function(person) {
        person.pays = ($scope.bill.total * (1.0*person.modifier/totalModifier)).toFixed(2);
      });
    }
    $scope.$watch('bill.total', updatePays);
    $scope.increase = function(person) {
      person.modifier = person.modifier % 10 + 1;
      updatePays();
    };
    data.getBill($routeParams.id).then(function(bill) {
      _.each(bill.people, function(person, i) {
        person.modifier = 1;
      });
      $scope.bill = bill;
      updatePays();
      $rootScope.title = 'Bill: ' + $scope.bill.name;
    });
  });
