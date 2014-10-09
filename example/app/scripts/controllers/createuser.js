'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:CreateuserCtrl
 * @description
 * # CreateuserCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller
  ( 'CreateUserCtrl'
  , function
    ( $scope
    , ngHueConfig
    , HueConfiguration
    , $http
    , $timeout
    )
    {
      $scope.errors = []
      $scope.config = ngHueConfig
      $scope.createUser = function() {
        HueConfiguration
          .user.create($scope.config.deviceType, $scope.config.username)
          .then(function(res){
            var count = res.data.length
            for(var i = 0; i < count; i++) {
              var data = res.data[i]
              for(var type in data) {
                var msg = {}
                msg.type = type === "error" ? "danger" : type
                if(type === "error")
                  msg.msg = data[type].description
                if(type === "success") {
                  var username = res.data[i][type].username
                  ngHueConfig.username = username
                  msg.msg = "User created - " + username
                }
                $scope.errors.push(msg)
                var idx = $scope.errors.length - 1
                $timeout(function(){
                  $scope.errors.splice(idx, 1)
                }, 2000)
              }
            }
          })
      }

      $scope.closeAt = function(idx) {
        $scope.errors.splice(idx, 1)
      }
    }
  );
