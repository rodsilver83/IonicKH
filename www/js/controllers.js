/**
 * Created by Rod on 10/31/14.
 */
angular.module('Controllers', ['ui.calendar'])
  .controller('LoginCtrl', ['HomeService', '$scope', '$state', function (HomeService, $scope, $state) {
    $scope.doLogin = function () {
      $state.go('tabs.home');
    }
  }])
  .controller('HomeCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $scope.height = Math.ceil(((innerHeight - 44 - 49 - 20) / 5 ) - 3);
    $scope.marginText = $scope.height - 35;

    $http.get('data/home.json', {cache: true}).success(function (data) {
      $scope.sections = data.data;
    });

    $scope.goTo = function (section) {
      return HomeService.goTo(section);
    }

  }])
  .controller('ListCtrl', ['HomeService', '$scope', '$http', '$stateParams', function (HomeService, $scope, $http, $stateParams) {
    var url = 'data/list' + $stateParams.id + '.json';

    function setHeight(rows) {
      if (rows > 5)
        rows = 5;
      $scope.height = Math.ceil(((innerHeight - 44 - 49 - 20) / rows ) - 3);
      $scope.marginText = $scope.height - 35;
    }

    $http.get(url, {cache: true}).success(function (data) {
      $scope.sections = data.data;
      setHeight(3);
    });

    $scope.goTo = function (section) {
      return HomeService.goTo(section);
    }
  }])
  .controller('ProductCtrl', ['HomeService', '$scope', '$http', '$stateParams', function (HomeService, $scope, $http, $stateParams) {
    var url = 'data/product' + $stateParams.id + '.json';
    $http.get(url, {cache: true}).success(function (data) {
      $scope.product = data.data;
    });
  }])
  .controller('ContentCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $http.get('data/content.json', {cache: true}).success(function (data) {
      $scope.content = data.data;
    });
  }])
  .controller('MenuCtrl', ['HomeService', '$scope', '$http', '$stateParams', function (HomeService, $scope, $http, $stateParams) {
    var url = 'data/menu' + $stateParams.id + '.json';
    $http.get(url, {cache: true}).success(function (data) {
      $scope.main = data.data.menu;
      $scope.menus = data.data.menus;

      $scope.height = Math.ceil(((innerHeight - 200 - 120) / 3 ) - 3);

    });

    $scope.goTo = function (menu) {
      return HomeService.goTo(menu);
    }

  }])
  .controller('QuestionsCtrl', ['HomeService', '$scope', '$http', '$stateParams', function (HomeService, $scope, $http, $stateParams) {
    var url = 'data/questions' + $stateParams.id + '.json';
    $http.get(url, {cache: true}).success(function (data) {
      $scope.main = data.data.menu;
      $scope.questions = data.data.questions;
    });
  }])
  .controller('VideoCtrl', ['HomeService', '$scope', '$http', '$sce', '$stateParams',
    function (HomeService, $scope, $http, $sce, $stateParams) {
      if ($stateParams.id > 0)
        $scope.index = $stateParams.id - 1;
      else
        $scope.index = 0;

      $scope.loadVideo = function (video) {
        $scope.main = video;
      }

      $http.get('data/video.json', {cache: true}).success(function (data) {
        $scope.videos = data.data.videos;
        $scope.main = data.data.videos[$scope.index];
      });
    }])
  .controller('AudioCtrl', ['HomeService', '$scope', '$http', '$sce', '$stateParams', '$timeout',
    function (HomeService, $scope, $http, $sce, $stateParams, $timeout) {
      if ($stateParams.id > 0)
        $scope.index = $stateParams.id - 1;
      else
        $scope.index = 0;

      var player = document.getElementById('player');

      $scope.play = false;
      $scope.duration = '00:00';
      $scope.currentTime = '00:00';
      $scope.playTime = 0;

      $scope.loadAudio = function (audio) {
        $scope.main = audio;
        $scope.play = false;

        $timeout(function () {
          $scope.duration = formatTime(player.duration);
          $scope.playTime = 0;
          $scope.currentTime = formatTime(player.currentTime);
        }, 1000);
      }

      player.addEventListener('loadedmetadata', function (data) {
        $scope.duration = formatTime(data.target.duration);
        $scope.playTime = 0;
        $scope.currentTime = formatTime(data.target.currentTime);
        $scope.$apply();
      })

      function formatTime(seconds) {
        seconds = Math.ceil(seconds);
        var date = new Date(seconds * 1000);
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();

        if (mm < 10) {
          mm = "0" + mm;
        }
        if (ss < 10) {
          ss = "0" + ss;
        }

        if (isNaN(ss) || isNaN(mm)) {
          ss = "00";
          mm = "00";
        }

        return mm + ':' + ss;
      }

      player.addEventListener('timeupdate', function (data) {
        $scope.currentTime = formatTime(player.currentTime);
        $scope.playTime = ((player.currentTime * 100) / player.duration);
        $scope.$apply();
      })

      player.addEventListener('ended', function () {
        $scope.play = false;
        $scope.$apply();
      })

      $scope.toggle = function () {
        $scope.play = !$scope.play;
        if ($scope.play) {
          player.play();
        } else {
          player.pause();
        }
      }

      $http.get('data/audio.json', {cache: true}).success(function (data) {
        $scope.audios = data.data.audios;
        $scope.main = data.data.audios[$scope.index];
        $timeout(function () {
          $scope.loadAudio($scope.main)
        }, 1000);
      });
    }])

  .controller('CalendarCtrl', ['HomeService', '$scope', '$http', '$stateParams', '$ionicModal',

    function (HomeService, $scope, $http, $stateParams, $ionicModal) {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      $scope.changeTo = 'Hungarian';
      /* event source that pulls from google.com */
      $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/Chicago' // an option!
      };
      /* event source that contains custom events on the scope */
      $scope.events = [
        {title: '', start: new Date(y, m, 3), className: "eventA"},
        {title: '', start: new Date(y, m, 3), className: "eventB"},
        {title: '', start: new Date(y, m, 3), className: "eventC"}
      ];
      /* event source that calls a function on every view switch */
      $scope.eventsF = function (start, end, timezone) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{
          title: 'Feed Me ' + m,
          start: s + (50000),
          end: s + (100000),
          allDay: false,
          className: ['customFeed']
        }];
      };

      $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: []
      };
      /* alert on eventClick */
      $scope.alertOnEventClick = function (date, jsEvent, view) {
      };

      /* config object */
      $scope.uiConfig = {
        calendar: {
          dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
          monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          height: 450,
          editable: true,
          header: {
            left: 'prev',
            center: 'title',
            right: 'next'
          },
          eventClick: $scope.alertOnEventClick
        }
      };

      /* event sources array*/
      $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    }])

  .controller('HomeTabCtrl', function ($scope) {
  });
