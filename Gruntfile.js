// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    // all of our configuration will go here
    
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'public/css',
          cssDir: 'public/css',
          environment: 'production'
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          spawn: false
        },
      },
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // ===========================================================================
  // REGISTER GRUNT TASK
  // ===========================================================================

  grunt.registerTask('default', ['concurrent']);

};