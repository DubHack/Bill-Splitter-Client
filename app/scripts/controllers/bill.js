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
    $scope.bill = {
      name: 'Loading...'
    };
    data.getBill($routeParams.id).then(function(bill) {
      $scope.bill = bill;
      $rootScope.title = 'Bill: ' + $scope.bill.name;
    });
  });
