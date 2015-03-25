(function(){
  'use strict'

  /**
   * Stoarge Service
   * @description Internal Storage Service wrapper for local storage
   * @since 10-12-2014
   */
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
  , [ 'ui.bootstrap'
    ]
  )
  /**
   * ngHueConfig
   * @constant
   */
  .constant
  ( 'ngHueConfig'
  , { deviceType: Storage.get('deviceType') || 'browser'
    , username: Storage.get('username') || ''
    , bridgeName: Storage.get('bridgeName') || 'Philip Hue'
    , bridgeIP: Storage.get('bridgeIP') || '127.0.0.1'
    , applicationName: Storage.get('applicationName') || 'ngHue'
    , baseUri:  Storage.get('baseUri') || 'http://127.0.0.1/api'
    }
  )
  .controller
  ( 'LightSelectCtrl'
  , [ '$scope'
    , 'Lights'
    , function
      ( $scope
      , Lights
      )
      {
        /**
         * @function $scope.toggleState
         * @description Toggles the on/off state of a bulb
         * @params {String} idx - The light id
         * @params {Object} lightState - Light State object
         * @returns {Array} response state within promise
         */
        $scope.toggleState = function(idx, lightState){
          Lights
            .toggleState(idx + 1, lightState)
            .then(function(res){
              Lights.get(idx + 1).then(function(res){
                res.data.open = true
                  Lights.lights[idx].state = res.data.state
              })
            })
        }
        /**
         * @function $scope.updateBrightness
         * @description Updates the brightness of a buib between 0 and 255
         * @params {String} idx - Light Id
         * @params {Number} bri - Brightness number between 0 and 255
         * 0-255
         */
        $scope.updateBrightness = function(idx, bri){
          Lights
            .updateBrightness(idx + 1, bri)
        }
        /**
         * Update Saturation
         * @description Updates the saturation of a bulb between 0 and 255
         * @params {String} idx - Light Id
         * @params {Number} sat - Saturation between 0 and 255
         */
        $scope.updateSaturation = function(idx, sat) {
          Lights
            .updateSaturation(idx + 1, sat)
        }
      }
    ]
  )
  .factory
  ( 'Lights'
  , [ '$http'
    , 'ngHueConfig'
    , '$q'
    , function
      ( $http
      , ngHueConfig
      , $q
      )
      {
        /**
         * @var {Object} Lights - Lights Factory Object
         */
        var Lights = {}
        /**
         * @var {String} baseUri- API Base URI for connecting to lights
         */
        var baseUri = function(){
          return ngHueConfig.baseUri + '/' + ngHueConfig.username + '/lights'
        }
        Lights.lights = [];
        /**
         * Get Lights
         * @params {String} lightId (optional)
         * @returns {Object} lights
         */
        Lights.get = function
        ( lightId
        )
        {
          var endpoint = baseUri()
          if(lightId)
            endpoint += '/' + lightId
          return $http.get(endpoint)
        }
        /**
         * updateName
         * Change lights name
         * @params {String} lightId = Light ID
         * @params {String} naee - New light name
         * @returns {Object} response - Response from Hue Bridge
         */
        Lights.updateName = function(lightId, name) {
          var endpoint = baseUri() + '/' + lightId
          return $http.put(endpoint)
        }
        /**
         * setState
         * Set light State
         * @params {String} lightId
         * @params {Object} stateObject
         * @returns {Object} responseObject
         */
        Lights.setState = function(lightId, stateObject){
          var endpoint = baseUri() + '/' + lightId + '/state'
          return $http.put(endpoint, stateObject)
        }
        /**
         * Update Brightness
         * @params {String} lightId - Light Id
         * @params {Number} bri - Brightness between 0-255
         */
        Lights.updateBrightness = function(lightId, bri) {
          var defer = $q.defer()
          var state = {}
          state.bri = bri
          var endpoint = baseUri() + '/' + lightId + '/state'
          $http
            .put(endpoint, state)
            .then(function(res){
              defer.resolve(res.data)
            })

          return defer.promise
        }
        Lights.toggleState = function(lightId, stateObject){
          stateObject.state.on = stateObject.state.on === true ? false : true
          var state = {}
          state.on = stateObject.state.on
          var endpoint = baseUri() + '/' + lightId + '/state'
          return $http.put(endpoint, state)
        }
        Lights.updateSaturation = function(lightId, sat) {
          var defer = $q.defer()
          var state = {}
          state.sat = sat
          var endpoint = baseUri() + '/' + lightId + '/state'
          $http
            .put(endpoint, state)
            .then(function(res){
              defer.resolve(res.data)
            })
          return defer.promise
        }
        // On load get lights
        Lights.get().then(function(res){
          Lights.lights = res.data
        })
        return Lights
      }
    ]
  )
  .factory
  ( 'Groups'
  , [ '$http'
    , 'ngHueConfig'
    , function
      ( $http
      , ngHueConfig
      )
      {
        var Groups = {}
        var baseUri = ngHueConfig.baseUri + '/' + ngHueConfig.username + '/groups'
        /**
         * Get Group(s)
         * @params {String} groupId - optional
         * @returns {Object} groupData
         * @description Passing a groupId will provide a single groups details
         * Passing no groupid will return all groups details
         */
        Groups.get = function(groupId) {
          var endpoint = baseUri
          if(groupId)
            endpoint += '/' + groupId
          return $http.get(endpoint)
        }
        /**
         * Create Group
         * @params {Objecct} groupObj
         * @prop {String} groupObj.name
         * @prop {Array} groupObj.lights
         * @returns {Object}
         */
        Groups.create = function(groupObject) {
          var endpoint = baseUri
          return $http.post(endpoint)
        }
        /**
         * Set State
         * @description Set the state of a group
         * @params {String} groupId - Group Id from bridge
         * @params {Object} state - state object
         */
        Groups.setState = function(groupId, state){
          var endpoint = baseUri
          endpoint += '/' + groupId + '/action'
          $http.put(endpoint, state)
        }

        /**
         * Set Group Attributes
         * @params {String} groupId
         * @params {Object} attributes
         * @prop {Object} attributes
         * @prop {String} attributes.name
         * @prop {Array} attributes.lights
         */
        Groups.setAttributes = function(groupId, attributes) {

        }

        return Groups
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
          $http.get('//client-eastwood-dot-hue-prod-us.appspot.com/api/nupnp').then(function(res){
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
        Configuration.update = function(config) {
          for(var key in config) {
            Storage.set(key, config[key])
          }
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
  .directive
  ( 'lightSelect'
  , [ function
      (
      )
      {
        var lightSelect = {};
        lightSelect.restrict = 'E'
        lightSelect.scope =
        { lights: '=lights'
        }
        lightSelect.link = function(scope, elem, attr) {
        }
        lightSelect.controller = 'LightSelectCtrl'
        lightSelect.templateUrl = 'templates/lightSelect.html'
        return lightSelect;
      }
    ]
  )
}());
