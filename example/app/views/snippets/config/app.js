'use strict'
// Within the config function
angular.module('youAppName',[]);
angular.config(['ngHueConfig', function(ngHueConfig){
  ngHueConfig.applicationName = 'yourAppName'
  ngHueConfig.deviceType = 'browser'
  ngHueConfig.username = 'ngHueBrowser'
}])

// Within the controller that has a form
angular.controller('mainCtrl',['$scope', 'ngHueConfig',function($scope,ngHueConfig){
  $scope.config = {}

  $scope.updateConfig = function(){
    for(var key in $scope.config) {
      ngHueConfig[key] = $scope.config[key]
    }
  }
}])
