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
        var baseUri = 'http://' + ngHueConfig.bridgeIP
        
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
