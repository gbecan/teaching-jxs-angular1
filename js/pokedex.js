var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/**Factory**/
pokeApp.factory("PokemonCheisoudou", function($resource){
    return $resource("http://pokeapi.co/api/v2/pokemon-species/:id/",{pokemonID:'@id'});
    });

/**Controller**/
pokeApp.controller('pokeController', function($scope, $log,PokemonCheisoudou, $http, $resource){
    $scope.log=function(){
    return console.log()
    };

    $http({
        method: 'GET',
        url:pokeApiUrl+'api/v2/pokedex/1/'
        }).then(function successfulCallback(response){
            $scope.pokemonList = response.data.pokemon_entries;
            console.log(response.data.pokemon_entries);
            }, function errorCallback(response){
                $scope.log="Error";
                });

            $scope.envoyer=function(pokemonID){
            console.log("Hallo");
            console.log(pokemonID);
            $scope.pokemonDisplay=PokemonCheisoudou.get();
            }
})//fin du pokeController
