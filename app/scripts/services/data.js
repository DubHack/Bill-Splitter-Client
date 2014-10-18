'use strict';

/**
 * @ngdoc service
 * @name billSplitterClientApp.data
 * @description
 * # data
 * Service in the billSplitterClientApp.
 */
angular.module('billSplitterClientApp')
  .service('data', function data($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getDetails = function() {
      var defer = $q.defer();
      defer.resolve({
        bills: [{
          id: 1,
          name: 'Indian Food',
          total: 55.32,
          paid: 12.32
        }, {
          id: 2,
          name: 'Spaceship',
          total: 1000000.00,
          paid: 0.05
        }],
        requests: [{
          id: 2,
          name: 'Small Country',
          requester: 'Tom Hanks',
          amount: 1323.00
        }]
      });
      return defer.promise;
    }
    this.getBill = function(id) {
      var defer = $q.defer();
      defer.resolve({
        name: 'Spaceship',
        total: 1000000.00,
        people: [{
          name: 'You'
        }, {
          name: 'Tristan',
          phone: '(206)382-2834'
        }]
      });
      return defer.promise;
    }
    this.signup = function(details) {
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    }
    this.isAuthed = function() {
      var defer = $q.defer();
      defer.resolve(window.localStorage.getItem('username') && window.localStorage.getItem('password'));
      return defer.promise;
    }
    this.getCards = function() {
      // stub
    }
  });
