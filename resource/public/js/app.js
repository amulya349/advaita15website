var ad = angular.module('ad', ['ui.router']);
console.log(Math.random());
ad.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/anything",
      templateUrl: "../../views/imp.html"
    })
    .state('state2', {
      url: "/state2",
      template: "<p>YO</p>"
    })
    });