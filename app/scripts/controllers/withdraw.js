'use strict';

/**
 * @ngdoc function
 * @name billSplitterClientApp.controller:WithdrawCtrl
 * @description
 * # WithdrawCtrl
 * Controller of the billSplitterClientApp
 */
angular.module('billSplitterClientApp')
  .controller('WithdrawCtrl', function ($rootScope, $scope, data) {
    $rootScope.title = "Withdraw to Debit Card";
    $scope.balance = "Loading...";
    data.getDetails().then(function(details) {
      $scope.balance = '$' + details.balance.toFixed(2);
    });
    function updateCards() {
      $scope.cards = _.map(JSON.parse(window.localStorage.getItem('cards')) || [], function(card) {
        card.number_safe = (card.number.slice(0,-4).replace(/./g, 'X')
                              + card.number.slice(-4)).replace(/.{4}/g, "$& ");
        card.edit = false;
        return card;
      });
    }
    $scope.withdraw = function(card) {
      if (confirm("You are about to transfer "+$scope.balance+" to this card. This will incur a 25 cent fee.")) {
        data.withdraw(card).then(function(status) {
          window.location = "#/home";
        });
      }
    }
    updateCards();
    function saveCards() {
      window.localStorage.setItem('cards', JSON.stringify($scope.cards));
      updateCards();
    }
    $scope.save = function(card) {
      card.edit = false;
      card.number = card.number_safe.replace(/\D/g, '');
      saveCards();
    };
    $scope.edit = function(card) {
      card.edit = true;
    }
    $scope.addCard = function() {
      $scope.cards.push({
        number: "",
        number_safe: "",
        month: 1,
        year: 14,
        holder: "",
        edit: true
      });
    };
  });
