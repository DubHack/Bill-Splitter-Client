"use strict";!function(){function a(){$(".menu").removeClass("open"),$(".darken").removeClass("open"),setTimeout(function(){$(".darken").hide()},150),d=!0}function b(){$(".darken").show(),setTimeout(function(){$(".darken").addClass("open"),$(".menu").addClass("open")}),d=!1}function c(){d?b():a()}var d=!0;$(document.body).on("click","a, .darken",a),$(document.body).on("click",".navbar-toggle",c)}(),angular.module("billSplitterClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl",noAuth:!0}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/add",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/add-amount",{templateUrl:"views/add-amount.html",controller:"AddAmountCtrl"}).when("/bill/:id",{templateUrl:"views/bill.html",controller:"BillCtrl"}).when("/withdraw",{templateUrl:"views/withdraw.html",controller:"WithdrawCtrl"}).when("/request/:id",{templateUrl:"views/request.html",controller:"RequestCtrl"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","data",function(a,b){a.$on("$routeChangeStart",function(a,c){c.$$route&&c.$$route.noAuth||b.isAuthed().then(function(b){b||(a.preventDefault(),window.location="#/login")})})}]),angular.module("billSplitterClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("billSplitterClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("billSplitterClientApp").controller("LoginCtrl",["$scope","$rootScope","data",function(a,b,c){function d(a,b){window.localStorage.setItem("username",a),window.localStorage.setItem("password",b)}if(b.title="Join",a.number="",a.error="",a.isSignup=!0,a.toggleLogin=function(){a.isSignup=!a.isSignup},a.login=function(){d(a.email,a.password),c.isAuthed().then(function(b){b?window.location="#/home":a.error="Invalid username or password!"})},a.register=function(){var b={email:a.email,number:a.number,password:a.password};c.signup(b).then(function(c){c.error?a.error=c.error:(d(b.email,b.password),window.location="#/home")})},c.isAuthed().then(function(a){a&&(window.location="#/home")}),"undefined"!=typeof cordova){var e=cordova.require("cordova/plugin/telephonenumber");e.get(function(b){a.number=b,a.$digest()},function(){})}}]),angular.module("billSplitterClientApp").controller("HomeCtrl",["$scope","$rootScope","data",function(a,b,c){b.title="Bills",a.bills=[],c.getDetails().then(function(b){a.balance=b.balance.toFixed(2),a.bills=b.bills,a.requests=b.requests})}]),angular.module("billSplitterClientApp").controller("AddCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("billSplitterClientApp").controller("AddAmountCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);var details={balance:34.21,bills:[{id:1,name:"Indian Food",total:20,location:"India",people:[{name:"You",amount:10,paid:!0},{name:"Jerry",phone:"(206)382-2834",amount:10,paid:!0}]},{id:2,name:"Spaceship",total:1e6,people:[{name:"You",amount:1e4,paid:!0},{name:"NASA",phone:"(206)382-2834",amount:99e4}]}],requests:[{id:2,name:"A Small Country",requester:"Tom Hanks",email:"thanks@gmail.com",amount:1323}]};angular.module("billSplitterClientApp").service("data",["$q",function(a){this.getDetails=function(){var b=a.defer();return _.each(details.bills,function(a){a.paid=_.reduce(a.people,function(a,b){return a+b.amount*(b.paid||!1)},0),console.log(a)}),b.resolve(details),b.promise},this.getBill=function(b){var c=a.defer();return this.getDetails().then(function(a){var d=_.find(a.bills,function(a){return a.id==b});c.resolve(d)}),c.promise},this.getRequest=function(b){var c=a.defer();return this.getDetails().then(function(a){var d=_.find(a.requests,function(a){return a.id==b});c.resolve(d)}),c.promise},this.signup=function(){var b=a.defer();return b.resolve(!0),b.promise},this.withdraw=function(){details.balance=0;var b=a.defer();return b.resolve(),b.promise},this.isAuthed=function(){var b=a.defer();return b.resolve(window.localStorage.getItem("username")&&window.localStorage.getItem("password")),b.promise},this.saveBill=function(b){var c=a.defer();return b.id=Math.floor(1e9*Math.random()),_.each(b.people,function(a){"You"==a.name&&(a.paid=!0),a.amount=parseFloat(a.pays)}),navigator.geolocation.getCurrentPosition(function(a){b.location=a.coords.latitude+","+a.coords.longitude,details.bills.push(b),c.resolve()},function(){}),c.promise},this.payStripe=function(){window.location="#/home"}}]),angular.module("billSplitterClientApp").controller("BillCtrl",["$scope","$rootScope","$routeParams","data","$sce",function(a,b,c,d,e){function f(){var b=a.bill.total||0,c=_.reduce(a.bill.people,function(a,b){return _.isUndefined(b.modifier)&&(b.modifier=1),a+b.modifier},0);_.each(a.bill.people,function(a){a.pays=(b*(1*a.modifier/c)).toFixed(2)})}a.$watch("bill.name",function(){b.title="Bill: "+(a.bill.name||"New")}),a.bill={name:"Loading..."},a.hasContactChooser=!_.isUndefined(window.plugins),a.addContact=function(){window.plugins.ContactChooser.chooseContact(function(b){b.email||b.phoneNumber?(a.bill.people.push({name:b.displayName,email:b.email,phone:b.phoneNumber}),f(),a.$digest()):alert("Contact must have an email or phone number!")})},a.save=function(){d.saveBill(a.bill).then(function(){window.location="#/home"})},a.addPhone=function(){var b=prompt("Add by Phone Number:");b&&(a.bill.people.push({name:b,phone:b}),f())},a.addEmail=function(){var b=prompt("Add by Email Address");b&&(a.bill.people.push({name:b,email:b}),f())},a.$watch("bill.total",f),a.increase=function(a){a.modifier=a.modifier%10+1,f()},"new"==c.id?(a.edit=!0,a.bill={name:"",people:[{name:"You"}]}):(a.edit=!1,d.getBill(c.id).then(function(b){b||(window.location="#/home"),a.bill=b,b.location&&(a.mapUrl=e.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyD3LRRqVGdBektRmURuyC6UVo3InzFrp6o%20%20&q="+b.location)),f()}))}]),angular.module("billSplitterClientApp").controller("WithdrawCtrl",["$rootScope","$scope","data",function(a,b,c){function d(){b.cards=_.map(JSON.parse(window.localStorage.getItem("cards"))||[],function(a){return a.number_safe=(a.number.slice(0,-4).replace(/./g,"X")+a.number.slice(-4)).replace(/.{4}/g,"$& "),a.edit=!1,a})}function e(){window.localStorage.setItem("cards",JSON.stringify(b.cards)),d()}a.title="Withdraw to Debit Card",b.balance="Loading...",c.getDetails().then(function(a){b.balance="$"+a.balance.toFixed(2)}),b.withdraw=function(a){confirm("You are about to transfer "+b.balance+" to this card. This will incur a 25 cent fee.")&&c.withdraw(a).then(function(){window.location="#/home"})},d(),b.save=function(a){a.edit=!1,a.number=a.number_safe.replace(/\D/g,""),e()},b.edit=function(a){a.edit=!0},b.addCard=function(){b.cards.push({number:"",number_safe:"",month:1,year:14,holder:"",edit:!0})}}]),angular.module("billSplitterClientApp").controller("RequestCtrl",["$scope","$rootScope","data","$routeParams",function(a,b,c,d){a.$watch("request.name",function(){b.title="Request: "+(a.request.name||"Loading...")}),c.getRequest(d.id).then(function(b){b||(window.location="#/home"),a.request=b});var e=StripeCheckout.configure({key:"pk_test_iplBCGv0v3b7XcLT6bYq6Xqt",image:"/square-image.png",token:function(b){c.payStrip(a.request,b)}});a.payWithStripe=function(a){e.open({name:"Bill Split",description:"Paying ",amount:2e3}),a.preventDefault()}}]),angular.module("billSplitterClientApp").controller("LogoutCtrl",["$scope",function(){window.localStorage.removeItem("username"),window.localStorage.removeItem("password"),window.location="#/login"}]);