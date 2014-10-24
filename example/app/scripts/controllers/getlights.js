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
      $scope.lights = []
      var getLights = function(){
        Lights.get().then(function(res){
          var lights = []
          var data = res.data
          var len = data.length
          for(var key in data) {
            if(!data[key].error) {
              lights.push(data[key])
            }
          }
          Lights.lights = lights
          $scope.lights = lights
        })
      }

      $scope.getLights = function(){
        getLights()
      }

      getLights()
    }
  );
