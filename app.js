var app = angular.module('WebApp', ['ngMaterial'])
app.controller('fetchData', function($scope,$http,$rootScope) {
    $http.get('http://starlord.hackerearth.com/edfora/hackernews') .then(function(response) {
      $scope.sortReverse = true ;
      $scope.results = response.data ;
      $scope.status = ' ' ;
      //Sort using broadcast and 'on' on click of a button
      $scope.$on('Type', function(event,data){
        $scope.sortType = data ;
       }) ;
       $scope.$on('Reverse', function(event,data){
        $scope.sortReverse = data ;
       }) ;
       $scope.$on('KeyWord', function(event,data){
        $scope.searchKeyword = data ;
       }) ;
      }, function(response) {
        $scope.results = "something went wrong" ;
        console.log($scope.results) ;
    }) 
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('input').primaryPalette('blue').accentPalette('pink').dark() ;
});

app.controller('BtnController' , function($scope,$rootScope,$mdDialog) {
  $scope.sortBy = function(sortType) {  
    $scope.sortType = sortType ;
    $scope.sortReverse = !($scope.sortReverse) ;

    $rootScope.$broadcast('Reverse' , $scope.sortReverse) ;
    $rootScope.$broadcast('Type' , $scope.sortType) ;
  };

  $scope.showPrompt = function(ev) {
    var confirm = $mdDialog.prompt()
    .title('What are you looking for?')
    .placeholder('Search Here')
    .ariaLabel('Tommy')
    .targetEvent(ev)
    .ok('Go')
    .cancel('Cancel') ;

    $mdDialog.show(confirm).then(function(result) {
      console.log(result) ;
      $rootScope.$broadcast('KeyWord', result) ;
    }, function() {
      $scope.status = 'Irrelevant results'
    }) ;



  } ;

}) ;
