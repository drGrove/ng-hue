"use strict";angular.module("exampleApp",["ngRoute","ngSanitize","ngTouch","ui.ace","ngHue"]).config(["$routeProvider","ngHueConfig",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("exampleApp").controller("MainCtrl",["$scope","ngHueConfig","HueConfiguration","$http",function(a,b,c,d){a.aceConfig={showGutter:!0,useWrapMode:!0,mode:"javascript",onLoad:a.aceLoaded,onChange:a.aceChanged},d.get("/views/snippets/config/app.js").then(function(b){a.data=b.data}),a.aceLoaded=function(){},a.aceChanged=function(){},a.config={}}]),angular.module("exampleApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);