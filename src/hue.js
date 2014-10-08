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
        var baseUri = 'http://' + ngHueConfig.bridgeIP + '/api'

        Configuration.user.create = function(deviceType, username){
          var endpoint = baseUri+ '/api'
          var deferred = $q.defer()
          var params = {}

          params.deviceType = ngHueConfig.applicationName + '#' + deviceType

          if(username)
            params.username = username

          $http.post(endpoint, params).then(function(res){
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
             deferred.resolve(res)
          })

          return deferred.promise
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
