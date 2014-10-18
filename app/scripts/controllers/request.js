'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('RequestCtrl', function ($scope, $rootScope, data, $routeParams) {
    $scope.$watch('request.name', function() {
      $rootScope.title = 'Request: ' + ($scope.request.name || 'Loading...');
    });
    data.getRequest($routeParams.id).then(function(request) {
      if (!request) {
        window.location = "#/home";
      }
      $scope.request = request;
    });
    var handler = StripeCheckout.configure({
      key: 'pk_test_iplBCGv0v3b7XcLT6bYq6Xqt',
      image: '/square-image.png',
      token: function(token) {
        // TODO: Implement this shit!
        data.payStrip($scope.request, token);
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
      }
    });

    $scope.payWithStripe = function(e) {
      // Open Checkout with further options
      handler.open({
        name: 'Bill Split',
        description: 'Paying ',
        amount: 2000
      });
      e.preventDefault();
    };
  });
