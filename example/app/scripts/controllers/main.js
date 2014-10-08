'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller
  ( 'MainCtrl'
  , function
    ( $scope
    , ngHueConfig
    , HueConfiguration
    , $http
    )
    {
      $scope.config = ngHueConfig

      $scope.updateConfig = function(){
       for(var key in $scope.config) {
         ngHueConfig[key] = $scope.config[key]
       } 
      }

      $scope.stationSearch = function(){
        HueConfiguration.discoverBridge().then(function(res){
          alert('Bridge found at ' + res.data[0].internalipaddress)
        }) 
      }

      $scope.aceConfig =
      { showGutter: true
      , useWrapMode: true
      , mode: 'javascript'
      , onLoad: $scope.aceLoaded
      , onChange: $scope.aceChanged
      }

      $http.get('views/snippets/config/app.js').then(function(res){
        $scope.data = res.data
      })

      $scope.aceLoaded = function(_editor) {
      };

      $scope.aceChanged = function(e) {
        //
      };

    }
  );
