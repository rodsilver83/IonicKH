/**
 * Created by Rod on 10/31/14.
 */
angular.module('Controllers', [])
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
  }]);
