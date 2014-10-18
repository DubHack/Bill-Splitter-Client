'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:BillCtrl
 * @description
 * # BillCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('BillCtrl', function ($scope, $rootScope, $routeParams, data, $sce) {
    $scope.$watch('bill.name', function() {
      $rootScope.title = 'Bill: ' + ($scope.bill.name || 'New');
    });
    $scope.bill = {
      name: 'Loading...'
    };
    $scope.hasContactChooser = !_.isUndefined(window.plugins);
    $scope.addContact = function() {
      window.plugins.ContactChooser.chooseContact(function (contactInfo) {
        if (!(contactInfo.email || contactInfo.phoneNumber)) {
          alert("Contact must have an email or phone number!");
        } else {
          $scope.bill.people.push({
            name: contactInfo.displayName,
            email: contactInfo.email,
            phone: contactInfo.phoneNumber
          });
          updatePays();
          $scope.$digest();
        }
      });
    };
    $scope.save = function() {
      data.saveBill($scope.bill).then(function(status) {
        window.location = "#/home";
      });
    }
    $scope.addPhone = function() {
      var phone = prompt("Add by Phone Number:");
      if (phone) {
        $scope.bill.people.push({
          name: phone,
          phone: phone
        });
        updatePays();
      }
    }
    $scope.addEmail = function() {
      var email = prompt("Add by Email Address");
      if (email) {
        $scope.bill.people.push({
          name: email,
          email: email
        });
        updatePays();
      }
    }
    function updatePays() {
      var total = $scope.bill.total || 0;
      var totalModifier = _.reduce($scope.bill.people, function(sum, person) {
        if (_.isUndefined(person.modifier)) {
          person.modifier = 1;
        }
        return sum + person.modifier;
      }, 0);
      _.each($scope.bill.people, function(person) {
        person.pays = (total * (1.0*person.modifier/totalModifier)).toFixed(2);
      });
    }
    $scope.$watch('bill.total', updatePays);
    $scope.increase = function(person) {
      person.modifier = person.modifier % 10 + 1;
      updatePays();
    };
    if ($routeParams.id=="new") {
      $scope.edit = true;
      $scope.bill = {
        name: '',
        people: [{
          name: 'You'
        }]
      }
    } else {
      $scope.edit = false;
      data.getBill($routeParams.id).then(function(bill) {
        if (!bill) {
          window.location = "#/home";
        }
        $scope.bill = bill;
        if (bill.location) {
          $scope.mapUrl = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyD3LRRqVGdBektRmURuyC6UVo3InzFrp6o%20%20&q=' + bill.location);
        }
        updatePays();
      });
    }
  });
