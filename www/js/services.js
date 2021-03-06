/**
 * Created by Rod on 10/31/14.
 */
angular.module('Services', [])
  .factory('HomeService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var homeList = null;
    var eventList = null;
    $http.get('data/home.json', {
      cache: true
    }).success(function (data) {
      homeList = data.data;
      $rootScope.$broadcast('HomeData');
    });

    return {
      getData: function () {
        return homeList;
      },
      getEvents: function(){
        return eventList;
      },
      goTo: function (section) {
        switch (section.type) {
          case 'list':
            return '#/tab/list/' + section.id;
            break;
          case 'product':
            return '#/tab/product/' + section.id;
            break;
          case 'menu':
            return '#/tab/menu/' + section.id;
            break;
          case 'contentQuestions':
            return '#/tab/questions/' + section.id;
            break;
          case 'content':
            return '#/tab/content/' + section.id;
            break;
          case 'calendar':
            return '#/tab/calendar/' + section.id;
            break;
          default:
            return '#/tab/home';
        }
      }
    }
  }]);
