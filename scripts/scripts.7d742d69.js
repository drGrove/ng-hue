"use strict";angular.module("exampleApp",["ngRoute","ngSanitize","ngTouch","ui.ace","ui.bootstrap","ngHue"]).config(["$routeProvider","ngHueConfig",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("exampleApp").controller("MainCtrl",["$scope",function(a){a.aceConfig={showGutter:!0,useWrapMode:!0,mode:"javascript"}}]),angular.module("exampleApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("exampleApp").controller("ConfigAppCtrl",["$scope","ngHueConfig","HueConfiguration","$http",function(a,b,c,d){a.config=b,a.updateConfig=function(){for(var d in a.config)b[d]=a.config[d];c.update(a.config)},a.stationSearch=function(){c.discoverBridge().then(function(a){b.bridgeIP=a.data[0].internalipaddress})},d.get("views/snippets/config/app.js").then(function(b){a.data=b.data})}]),angular.module("exampleApp").controller("CreateUserCtrl",["$scope","ngHueConfig","HueConfiguration","$http","$timeout",function(a,b,c,d,e){a.errors=[],a.config=b,a.createUser=function(){c.user.create(a.config.deviceType,a.config.username).then(function(c){for(var d=c.data.length,f=0;d>f;f++){var g=c.data[f];for(var h in g){var i={};if(i.type="error"===h?"danger":h,"error"===h&&(i.msg=g[h].description),"success"===h){var j=c.data[f][h].username;b.username=j,i.msg="User created - "+j}a.errors.push(i);var k=a.errors.length-1;e(function(){a.errors.splice(k,1)},2e3)}}})},a.closeAt=function(b){a.errors.splice(b,1)}}]),angular.module("exampleApp").controller("GetLightsCtrl",["$scope","ngHueConfig","Lights",function(a,b,c){a.lights=[];var d=function(){c.get().then(function(b){{var d=[],e=b.data;e.length}for(var f in e)e[f].error||d.push(e[f]);c.lights=d,a.lights=d})};a.getLights=function(){d()},d()}]);