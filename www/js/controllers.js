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

      $scope.detail = {date: null, month: null};

      $scope.uiConfig = {
        calendar: {
          header: {
            left: 'prev',
            center: 'title',
            right: 'next'
          }
        }
      };


      $scope.uiConfig.calendar.dayNamesShort = ["D", "L", "M", "M", "J", "V", "S"];
      $scope.uiConfig.calendar.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"];

      /* event source that contains custom events on the scope */

      $scope.events = [
        {title: 'Evento A', start: "11 03 2014 10:00:00 GMT-0600", className: "eventA"}
      ];

      /* event sources array*/
      $scope.eventSources = [$scope.events];
/*
      $scope.alertOnEventClick = function (date, jsEvent, view) {
        setDetailDate(date._start);
        $scope.openModal();
      };

      function setDetailDate(date) {
        $scope.detail.date = date;
        switch(date.getMonth()){
          case 0:
            $scope.detail.month = 'Enero';
            break;
          case 1:
            $scope.detail.month = 'Febrero';
            break;
          case 2:
            $scope.detail.month = 'Marzo';
            break;
          case 3:
            $scope.detail.month = 'Abril';
            break;
          case 4:
            $scope.detail.month = 'Mayo';
            break;
          case 5:
            $scope.detail.month = 'Junio';
            break;
          case 6:
            $scope.detail.month = 'Julio';
            break;
          case 7:
            $scope.detail.month = 'Agosto';
            break;
          case 8:
            $scope.detail.month = 'Septiembre';
            break;
          case 9:
            $scope.detail.month = 'Octubre';
            break;
          case 10:
            $scope.detail.month = 'Noviembre';
            break;
          case 11:
            $scope.detail.month = 'Diciembre';
            break;
        }
      }

      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      });
      */
    }])

  .controller('HomeTabCtrl', function ($scope) {
  });
