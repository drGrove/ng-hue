(function(){
  'use strict'

  var Storage = {
    data : {},
    storage_id: 'HUE_',
    get: function( key )  {
      var data , result;
      try{
        data = localStorage.getItem(this.storage_id+key);
      } catch(e){}
      try {
        result = JSON.parse(data);
      } catch(e) {
        result = data;
      }
      //$log.info('>> storageService',key,result);
      return result;
    },
    set: function(key,data){
      if (typeof data === "object"){
        data = JSON.stringify(data);
      }
      try{
        localStorage.setItem(this.storage_id+key, data);
        //$log.info('<< storageService',key,data);
      } catch(e){
        $log.error('!! storageService',e);
      }
    },
    remove: function(key)  {
      try {
        var status = localStorage.removeItem(this.storage_id+key);
        $log.info('-- storageService',key);
        return status;
      } catch( e ){
        $log.error('!! storageService',e);
        return false;
      }
    }
  };

  /**
   * Defines angular module
   * @name ngHue
   */
  angular
  .module
  ( 'ngHue'
  , [
    ]
  )

  /**
   * ngHueConfig
   * @constant
   */
  .constant
  ( 'ngHueConfig'
  , { deviceType: 'browser'
    , username: ''
    , bridgeName: 'Philip Hue'
    , bridgeIP: '127.0.0.1'
    , applicationName: 'ngHue'
    , baseUri: 'http://127.0.0.1/api'
    }
  )

  .directive
  ( 'lightSelect'
  , [
    ]
  )

  .controller
  ( 'lighSelectCtrl'
  , [ '$scope'
    , function
      ( $scope
      )
      {

      }
    ]
  )
  .factory
  ( 'HueConfiguration'
  , [ '$http'
    , '$q'
    , 'ngHueConfig'
    , function
      ( $http
      , $q
      , ngHueConfig
      )
      {
        var Configuration = {}
        Configuration.user = {}
        Configuration.user.create = function(deviceType, username){
          var baseUri = ngHueConfig.baseUri
          var deferred = $q.defer()
          var params = {}
          params.devicetype = ngHueConfig.applicationName + '#' + deviceType
          if(username)
            params.username = username
          $http.post(baseUri, params).then(function(res){
            ngHueConfig.username = res.data.username
            ngHueConfig.deviceType = deviceType
            deferred.resolve(res)
          })
          return deferred.promise
        }
        Configuration.discoverBridge = function(){
          var deferred = $q.defer()
          $http.get('https://www.meethue.com/api/nupnp').then(function(res){
            var ip = res.data[0].internalipaddress
            var name = res.data[0].name
            var baseUri = 'http://' + ngHueConfig.bridgeIP + '/api'
            ngHueConfig.bridgeIP = ip
            ngHueConfig.brideName = name
            ngHueConfig.baseUri = baseUri
            Storage.set('bridgeIP', ip)
            Storage.set('bridgeName', name)
            Storage.set('baseUri', baseUri)
            deferred.resolve(res)
          })
          return deferred.promise
        }
        Configuration.autoDiscover = function(bool) {
          Storage.set('autoDiscover', bool)
          if(bool === true) {
            Configuration
              .getFromBridge()
              .then(function(res){
                var ip = res.data[0].internalipaddress
                var name = res.data[0].name
                Storage.set('bridgeIP', ip)
                Storage.set('bridgeName', name)
                ngHueConfig.bridgeName = name
                ngHueConfig.bridgeIP = ip
              })
          }
        }
        Configuration.getFromBridge = function(){
          var baseUri = ngHueConfig.baseUri
          var endpoint = baseUri + '/' + ngHueConfig.username + '/config'
          return $http.get(endpoint)
        }
        var getConfigFromStorage = function(){
          for(var key in ngHueConfig) {
            var value = Storage.get(key)
            ngHueConfig[key] = value === null ? ngHueConfig[key] : value
          }
        }

        getConfigFromStorage()
        return Configuration
      }
    ]
  )

  .factory
  ( 'HueToast'
  , [ function
      (
      )
      {
        var HueToast = {}

        HueToast.toasts = []

        HueToast.add = function(toast) {
          HueToast.toasts.push(toast)
        }

        HueToast.remove = function(idx) {
          HueToast.toasts.splice(idx, 1)
        }

        return HueToast
      }
    ]
  )

}());
