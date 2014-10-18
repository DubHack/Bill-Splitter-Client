'use strict';
(function() {
  var closed = true;
  function hideNav() {
    $(".menu").removeClass('open');
    $(".darken").removeClass('open');
    setTimeout(function() {
      $('.darken').hide();
    }, 150);
    closed = true;
  }
  function showNav() {
    $(".darken").show();
    setTimeout(function() {
      $('.darken').addClass('open');
      $(".menu").addClass('open');
    });
    closed = false;
  }
  function toggleNav() {
    if (closed) {
      showNav();
    } else {
      hideNav();
    }
  }

  $(document.body).on('click', 'a, .darken', hideNav);
  $(document.body).on('click', '.navbar-toggle', toggleNav);
})();

/**
 * @ngdoc overview
 * @name billSplitterClientApp
 * @description
 * # billSplitterClientApp
 *
 * Main module of the application.
 */
angular
  .module('billSplitterClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .when('/add-amount', {
        templateUrl: 'views/add-amount.html',
        controller: 'AddAmountCtrl'
      })
      .when('/bill/:id', {
        templateUrl: 'views/bill.html',
        controller: 'BillCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
