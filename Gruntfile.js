module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-browserify");


  grunt.initConfig({

    autoprefixer: {
        css: {
            src: 'builds/dev/css/**/*.css',
        }
    },

    browserify: {
        options: {
            debug: true,
        },
        dev: {
            //options: {
                //alias: ['app:'] // make 'app' available in dev tools
            //},
            src: ['components/js/main.js'],
            dest: 'builds/dev/js/bundle.js'
        },
    },

    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      
      sass: {
        files: ['components/sass/**/*.scss'],
        tasks: ['compass:dev'] 
      },

      js: {
        files: ['components/js/**/*.js'],
        tasks: ['browserify:dev']
      }
      

    
    } // watch
  }); // initConfig
  
  grunt.registerTask('default', ['watch']);

}; // exports

