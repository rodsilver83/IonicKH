/**
 * Created by Rod on 10/31/14.
 */
angular.module('Controllers', [])
  .controller('LoginCtrl',['HomeService','$scope','$state',function(HomeService,$scope,$state){
    $scope.doLogin = function (){
      $state.go('tabs.home');
    }
  }])
  .controller('HomeCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {

    $http.get('data/home.json', {cache: true}).success(function (data) {
      $scope.sections = data.data;
    });

    $scope.goTo = function (section) {
      return HomeService.goTo(section);
    }

  }])
  .controller('ListCtrl', ['HomeService', '$scope', '$http', '$stateParams', function (HomeService, $scope, $http, $stateParams) {
    var url = 'data/list' + $stateParams.id + '.json';

    $http.get(url, {cache: true}).success(function (data) {
      $scope.sections = data.data;
    });

    $scope.goTo = function (section) {
      return HomeService.goTo(section);
    }
  }])
  .controller('ProductCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $http.get('data/product.json', {cache: true}).success(function (data) {
      $scope.product = data.data;
    });
  }])
  .controller('ContentCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $http.get('data/content.json', {cache: true}).success(function (data) {
      $scope.content = data.data;
    });
  }])
  .controller('MenuCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $http.get('data/menu.json', {cache: true}).success(function (data) {
      $scope.main = data.data.menu;
      $scope.menus = data.data.menus;
    });

    $scope.goTo = function (menu) {
      return HomeService.goTo(menu);
    }
  }])
  .controller('QuestionsCtrl', ['HomeService', '$scope', '$http', function (HomeService, $scope, $http) {
    $http.get('data/questions.json', {cache: true}).success(function (data) {
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

        if(isNaN(ss) || isNaN(mm)){
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
    }]);
