'use strict';
(function() {
  var closed = true;
  function hideNav() {
    $(".menu").removeClass('open');
    $(".darken").removeClass('open');
    $(".menu-toggle").removeClass('open');
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
      $(".menu-toggle").addClass('open');
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
  $(document.body).on('click', '.menu-toggle', toggleNav);
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
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        noAuth: true
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
      .when('/withdraw', {
        templateUrl: 'views/withdraw.html',
        controller: 'WithdrawCtrl'
      })
      .when('/request/:id', {
        templateUrl: 'views/request.html',
        controller: 'RequestCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }).run(function($rootScope, data) {
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if(!(next.$$route && next.$$route.noAuth)) {
          data.isAuthed().then(function(authed) {
            if (!authed) {
              event.preventDefault();
              window.location = "#/login";
            }
          });
        }
      });
    });
