angular.module('ionicApp', ['ionic','ngCordova','ui.calendar','Directives','Controllers','Services'])

  .run(function($cordovaSplashscreen) {

    setTimeout(function() {
      $cordovaSplashscreen.hide()
    }, 3000)
  })

  .config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://www.youtube.com/**',
      'http://www.noiseaddicts.com/**'
    ]);

    $stateProvider
      .state('launch', {
        url: "/launch",
        abstract: true,
        templateUrl: "templates/launch.html"
      })
      .state('launch.login', {
        url: "/login",
        views: {
          'login-tab': {
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
          }
        }
      })
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
      .state('tabs.content', {
        url: "/content/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/contentText.html",
            controller: 'ContentCtrl'
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
      .state('tabs.video', {
        url: "/video",
        views: {
          'home-tab': {
            templateUrl: "templates/views/video.html",
            controller: 'VideoCtrl'
          }
        }
      })
      .state('tabs.audio', {
        url: "/audio",
        views: {
          'home-tab': {
            templateUrl: "templates/views/audio.html",
            controller: 'AudioCtrl'
          }
        }
      })
      .state('tabs.calendar', {
        url: "/calendar/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/views/calendar.html",
            controller: 'CalendarCtrl'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise("/launch/login");

  })
;