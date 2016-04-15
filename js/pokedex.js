var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/**Factory**/
pokeApp.factory("PokemonCheisoudou", function($resource){
    return $resource("http://pokeapi.co/api/v2/pokemon-species/:id/",{id:'@id'});
    });

/**Controller**/
pokeApp.controller('MainController', function($scope, $log,PokemonCheisoudou, $http, $resource){
    $scope.log=function(){
        return console.log()
    };

    $scope.showLoader= function(){
        $scope.state="LOADING";
    }
    $scope.noresult = function(){
        $scope.state = "NORESULT" ;
    }
    $scope.result = function(){
        $scope.state = "SUCCESS" ;
    }

   // if ($scope.state)

    $http({
        method: 'GET',
        url:pokeApiUrl+'api/v2/pokedex/1/'
        }).then(function successfulCallback(response){
            $scope.pokemonList = response.data.pokemon_entries;
            console.log(response.data.pokemon_entries);
            }, function errorCallback(response){
                $scope.log="Error";
                });
                $scope.go=function(id){
                console.log("Hallo");
                console.log(pokemon_entries.pokemon_species.id);
               // $scope.pokemonDisplay=PokemonCheisoudou.get();
                }




});//fin du MainController


pokeApp.controller('pokecontroller', function($scope, $log,PokemonCheisoudou, $http, $resource){

});




   // $filter('myPokeFilter')

