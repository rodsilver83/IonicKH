angular.module('ionicApp', ['ionic','Directives','Controllers','Services'])

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
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tabs.list', {
        url: "/list/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/list.html",
            controller: 'ListCtrl'
          }
        }
      })
      .state('tabs.product', {
        url: "/product/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/product.html",
            controller: 'ProductCtrl'
          }
        }
      })
      .state('tabs.menu', {
        url: "/menu/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/menu.html",
            controller: 'MenuCtrl'
          }
        }
      })
      .state('tabs.questions', {
        url: "/questions/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/contentQuestions.html",
            controller: 'QuestionsCtrl'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise("/tab/home");

  })

  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  });