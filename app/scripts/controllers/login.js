'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('LoginCtrl', function ($scope, $rootScope, data) {
    $rootScope.title = "Join";
    $scope.number = "";
    $scope.error = "";
    $scope.isSignup = true;
    $scope.toggleLogin = function() {
      $scope.isSignup = !$scope.isSignup;
    }
    function setCreds(username, password) {
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('password', password);
    }
    $scope.login = function() {
      setCreds($scope.email, $scope.password);
      data.isAuthed().then(function(authed) {
        if (authed) {
          window.location = "#/home";
        } else {
          $scope.error = "Invalid username or password!";
        }
      });
    }
    $scope.register = function() {
      var details = {
        email: $scope.email,
        number: $scope.number,
        password: $scope.password
      }
      data.signup(details).then(function(resp) {
        if (resp.error) {
          $scope.error = resp.error;
        } else {
          setCreds(details.email, details.password);
          window.location = "#/home";
        }
      });
    }
    data.isAuthed().then(function(authed) {
      if (authed) {
        window.location = "#/home";
      }
    });
    if ((typeof cordova) !== "undefined") {
      var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
      telephoneNumber.get(function(result) {
        $scope.number = result;
        $scope.$digest();
      }, function() {
      });
    }
  });
