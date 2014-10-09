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
    )
    {
      $scope.aceConfig =
      { showGutter: true
      , useWrapMode: true
      , mode: 'javascript'
      }


    }
  );
