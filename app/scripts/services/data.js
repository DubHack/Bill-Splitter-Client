'use strict';

/**
 * @ngdoc service
 * @name billSplitterClientApp.data
 * @description
 * # data
 * Service in the billSplitterClientApp.
 */
var details = {
  balance: 34.21,
  bills: [{
    id: 1,
    name: 'Indian Food',
    total: 20,
    location: 'India',
    people: [{
      name: 'You',
      amount: 10.00,
      paid: true
    }, {
      name: 'Jerry',
      phone: '(206)382-2834',
      amount: 10.00,
      paid: true
    }]
  }, {
    id: 2,
    name: 'Spaceship',
    total: 1000000.00,
    people: [{
      name: 'You',
      amount: 10000.00,
      paid: true
    }, {
      name: 'NASA',
      phone: '(206)382-2834',
      amount: 990000
    }]
  }],
  requests: [{
    id: 2,
    name: 'A Small Country',
    requester: 'Tom Hanks',
    email: 'thanks@gmail.com',
    amount: 1323.00
  }]
}


angular.module('billSplitterClientApp')
  .service('data', function data($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getDetails = function() {
      var defer = $q.defer();
      _.each(details.bills, function(bill) {
        bill.paid = _.reduce(bill.people, function(sum, person) {
          return sum + person.amount * (person.paid || false);
        }, 0);
        console.log(bill);
      });
      defer.resolve(details);
      return defer.promise;
    }
    this.getBill = function(id) {
      var defer = $q.defer();
      this.getDetails().then(function(deets) {
        var found = _.find(deets.bills, function(a) {
          return a.id == id;
        });
        defer.resolve(found);
      });
      return defer.promise;
    }
    this.getRequest = function(id) {
      var defer = $q.defer();
      this.getDetails().then(function(deets) {
        var found = _.find(deets.requests, function(a) {
          return a.id == id;
        });
        defer.resolve(found);
      });
      return defer.promise;
    }
    this.signup = function(details) {
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    }
    this.withdraw = function(card) {
      details.balance = 0;
      var defer = $q.defer();
      defer.resolve();
      return defer.promise;
    };
    this.isAuthed = function() {
      var defer = $q.defer();
      defer.resolve(window.localStorage.getItem('username') && window.localStorage.getItem('password'));
      return defer.promise;
    }
    this.saveBill = function(bill) {
      var defer = $q.defer();
      bill.id = Math.floor(Math.random()*1000000000);
      _.each(bill.people, function(person) {
        if (person.name == 'You') {
          person.paid = true;
        }
        person.amount =  parseFloat(person.pays)
      });
      navigator.geolocation.getCurrentPosition(function(position) {
        bill.location = position.coords.latitude +","+position.coords.longitude;
        details.bills.push(bill);
        defer.resolve();
      }, function() {});
      return defer.promise;
    }
    this.payStripe = function(request, token) {
      window.location = "#/home";
    };
  });
