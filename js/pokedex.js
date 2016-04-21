var pokeApp = angular.module('pokedex', ['ngResource']);
/*Utilities*/


pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/**Factory**/
pokeApp.factory("searchPokemon", function($resource){
    return $resource("http://pokeapi.co/api/v2/pokemon-species/:id/",{id:'@id'});
});

/**Controller**/
pokeApp.controller('MainController', function($scope, $log,searchPokemon, $http){
    var pokeURL="http://pokeapi.co/api/v2/pokedex/1";
    $scope.loading=true;

    // Get the list of all the Pokemons
    $http.get(pokeURL)
        .then(function successCallback(response){
                $log.log("LOG : CONTROLLER : Successfully got them !!");
                $scope.loading=false;
                $scope.data = {
                    // To display the name of the selected pokemon
                    selectedPokemon: null,
                    // To provide the list of pokemons
                    pokemons: response.data.pokemon_entries
                };
        });


    $scope.go=function(pokemonID){
    console.log(pokemonID);
        // Show loading spinner.
         $scope.loading = true;
        searchPokemon.get({id:pokemonID}).$promise
             .then(function(response){
                 $scope.myPokemon=response;
                 console.log($scope.myPokemon);
                 })
             .finally(function (response) {
              // Hide loading spinner whether our call succeeded or failed.
              $scope.loading = false;
              });


     } //EOFunction

});//fin du MainController

pokeApp.controller('pokemonDetailsController', function($scope, $log, searchPokemon, $http){
$scope.myPokemon
// watches if the pokemon in service changes
    $scope.$watch(
        // the watched value
        function () {
            return searchPokemon.myPokemon
        }
    )


});//fin pokemondetailsController
