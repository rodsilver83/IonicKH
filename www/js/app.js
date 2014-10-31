angular.module('ionicApp', ['ionic'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tabs.home', {
        url: "/home",
        views: {
          'home-tab': {
            templateUrl: "templates/home.html",
            controller: 'HomeTabCtrl'
          }
        }
      })
      .state('tabs.facts', {
        url: "/facts",
        views: {
          'home-tab': {
            templateUrl: "templates/facts.html"
          }
        }
      })
      .state('tabs.facts2', {
        url: "/facts2",
        views: {
          'home-tab': {
            templateUrl: "templates/facts2.html"
          }
        }
      })
      .state('tabs.categories', {
        url: "/categories",
        views: {
          'home-tab': {
            templateUrl: "templates/categories.html"
          }
        }
      });

    $urlRouterProvider.otherwise("/tab/home");

  })

  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  });