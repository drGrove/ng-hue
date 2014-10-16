'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt');

  var appConfig = {
    dist: 'dist'
  }

  grunt.initConfig
  ( { watch:
      { templates:
        { files:
          [ 'src/templates/**.html'
          ]
        , tasks:
          [ 'ngtemplates'
          ]
        }
      }
    , ngtemplates:
      { ngHue:
        { cwd: 'src'
        , src: 'templates/**.html'
        , dest: 'dist/ng-hue-templates.js'
        }
      }
    , jsdoc:
      { dist:
        { src: ['src/*.js']
        , options:
          { destination: 'doc'
          }
        }
      }
    }
  )

  grunt.registerTask
  ( 'build'
  , [ 'ngtemplates'
    ]
  )
}
