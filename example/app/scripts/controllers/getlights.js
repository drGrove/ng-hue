'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:GetlightsCtrl
 * @description
 * # GetlightsCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller
  ( 'GetLightsCtrl'
  , function 
    ( $scope
    , ngHueConfig
    , Lights
    ) 
    {
      Lights.get().then(function(res){
        Lights.lights = res.data
        $scope.lights = res.data
      })
    }
  );
