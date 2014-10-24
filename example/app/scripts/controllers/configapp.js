'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:ConfigappCtrl
 * @description
 * # ConfigappCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller
  ( 'ConfigAppCtrl'
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
       HueConfiguration.update($scope.config)
      }

      $scope.stationSearch = function(){
        HueConfiguration.discoverBridge().then(function(res){
          // This is auto set within the service call But if there are other
          // options you'd like to add you will have full access to the return
          ngHueConfig.bridgeIP = res.data[0].internalipaddress
        })
      }

      $http.get('views/snippets/config/app.js').then(function(res){
        $scope.data = res.data
      })
    }
  );
