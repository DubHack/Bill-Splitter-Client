'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('HomeCtrl', function ($scope, $rootScope, data) {
    $rootScope.title = 'Bills';
    $scope.bills = [];
    data.getDetails().then(function(details) {
      $scope.bills = details.bills;
      $scope.requests = details.requests;
    });
  });
