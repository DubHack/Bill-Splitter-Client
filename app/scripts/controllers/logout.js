'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('LogoutCtrl', function ($scope) {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
    window.location = "#/login";
  });
