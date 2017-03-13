var app = angular.module('WebApp', ['ngMaterial'])
app.controller('fetchData', function($scope,$http,$rootScope) {
    $http.get('http://starlord.hackerearth.com/edfora/hackernews') .then(function(response) {
      $scope.results = response.data ;
      $scope.$on('Reverse' , function(event,data) {
        $scope.sortType = data ;
      });
      $scope.$on('Type' , function(event,data){
        $scope.sortReverse = data ;
      });

    }, function(response) {
      $scope.results = "something went wrong" ;
      console.log($scope.results) ;
  }) 
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme').backgroundPalette('grey').dark();
});

app.controller('SortController' , function($scope,$rootScope) {
  $scope.send = function(data) {  
    $scope.sortType = 'num_points' ;
    $scope.sortReverse = data ;

    $rootScope.$broadcast('Reverse' , $scope.sortReverse) ;
    $rootScope.$broadcast('Type' , $scope.sortType) ;
  };
}) ;
