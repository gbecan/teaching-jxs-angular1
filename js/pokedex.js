var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/**Factory**/
pokeApp.factory("searchPokemon", function($resource){
   // return $resource("http://pokeapi.co/api/v2/pokemon-species/:id/",{id:'@id'});
   return $resource("http://pokeapi.co/api/v2/pokemon/?limit=811");
});




/**service**/
//un service peut être considére comme une classe, on y a donc accès de n'importe où.
pokeApp.service('pokemonService', [function () {
    var pokemon;
    this.setPokemon = function (pokemon) {
        this.pokemon = pokemon;
    }
    this.setPokemonSprite = function (sprite) {
    //sprite= image
        this.pokemon.sprite = sprite;
    }
}]);






/**Controller**/
pokeApp.controller('MainController', function($scope, $log,searchPokemon, $http, pokemonService){
    var pokeURL="http://pokeapi.co/api/v2/pokedex/1";
    $scope.pokemon;
    // Get the list of all the Pokemons
    $http.get(pokeURL)
        .then(function successCallback(response){
                $log.log("LOG : CONTROLLER : ILS ARRIVENNT !! - Qui ça ? - LES POKÉMOOOOOONS !");
                $scope.data = {
                    // To display the name of the selected pokemon
                    selectedPokemon: null,
                    // To provide the list of pokemons
                    pokemons: response.data.pokemon_entries
                };
        });

         $scope.go=function(pokemonID){
         //pokemonID = entry_number du pokemon selectionné
            console.log(pokemonID);
            $scope.myPokemon=searchPokemon.get({id:pokemonID});
           // console.log("Stringify" + JSON.stringify($scope.myPokemon));
         }




});//fin du MainController

pokeApp.controller('pokemonDetailsController', function($scope, $log, searchPokemon, $http, pokemonSevice){

  /*  //Get the detailed info about the selected pokemon
    $scope.go=function(pokemonID){
    pokemonID = searchPokemon.get({id:pokemonID});
      $log.log("Go function");
       console.log(pokemonID);
       $scope.myPokemon=searchPokemon.get({id:pokemonID});

       console.log(myPokemon);
    }

    */
    //$scope.pokemon;


                   //console.log(id);

});
