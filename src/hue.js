(function(){
  'use strict'

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
  , { deviceType: ''
    , username: ''
    , brideName: ''
    , bridgeIP: ''
    , applicationName: 'ngHue'
    , baseUri: ''
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
             ngHueConfig.bridgeIP = res.data[0].internalipaddress
             ngHueConfig.brideName = res.data[0].name
             ngHueConfig.baseUri = 'http://' + ngHueConfig.bridgeIP + '/api'
             deferred.resolve(res)
          })

          return deferred.promise
        }

        Configuration.getFromBridge = function(){
          var baseUri = ngHueConfig.baseUri
          var endpoint = baseUri + '/' + ngHueConfig.username + '/config'
          return $http.get(endpoint)
        }

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
