/**
 * Created by Rod on 10/31/14.
 */
angular.module('Services', [])
  .factory('HomeService',['$http','$q','$rootScope',function($http,$q,$rootScope){

    var homeList = null;
    $http.get('data/home.json',{
      cache: true
    }).success(function(data){
      homeList = data.data;
      $rootScope.$broadcast('HomeData');
    });

    return {
      getData: function(){
        return homeList;
      },
      goTo: function(section){
        switch(section.type){
          case 'list':
            return '#/tab/list/'+section.id;
          break;
          case 'product':
            return '#/tab/product/'+section.id;
            break;
          case 'menu':
            return '#/tab/menu/'+section.id;
            break;
          case 'contentQuestions':
            return '#/tab/questions/'+section.id;
            break;
          default:
            return '#/tab/home';
        }
      }
    }
  }]);
