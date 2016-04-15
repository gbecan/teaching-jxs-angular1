var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/**Factory**/
pokeApp.factory("searchPokemon", function($resource){
    return $resource("http://pokeapi.co/api/v2/pokemon-species/:id/",{id:'@id'});
    });

/**Controller**/
pokeApp.controller('MainController', function($scope, $log,searchPokemon, $http, $resource){
    $scope.log=function(){
        return console.log()
    };

    $scope.showLoader= function(){
        $scope.state="LOADING";
    }

    $http({
        method: 'GET',
        url:pokeApiUrl+'api/v2/pokedex/1'
        }).then(function successfulCallback(response){
            $scope.pokemonList = response.data.pokemon_entries;
            $scope.state="SUCCESS";
            }, function errorCallback(response){
                $scope.log="Error";
               });

               $scope.go=function(pokemonID){
               console.log("Hallo test ");
               $scope.myPokemon=searchPokemon.get({id:pokemonID});
               }

});//fin du MainController

pokeApp.controller('pokemonDetailsController', function($scope, $log, searchPokemon, $http, $resource){
    $scope.log=function(){
           return console.log()
       };
       $scope.uri= myPokemon.url;
       console.log(uri);

});