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
    this.getBills = function() {
      var defer = $q.defer();
      defer.resolve([{
        id: 1,
        name: 'Indian Food',
        total: 55.32,
        paid: 12.32
      }, {
        id: 2,
        name: 'Spaceship',
        total: 1000000.00,
        paid: 0.05
      }]);
      return defer.promise;
    }
    this.getBill = function(id) {
      var defer = $q.defer();
      defer.resolve({
        name: 'Spaceship',
        people: [{
          name: 'Tristan',
          phone: '(206)382-2834'
        }]
      });
      return defer.promise;
    }
  });
