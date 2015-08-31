module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-notify");


  grunt.initConfig({

    notify: {
        sass: {
            options: {
                title: 'Sass files built',
                message: 'Sass task complete'
            } 
        },
    },

    autoprefixer: {
        css: {
            src: 'builds/dev/css/**/*.css',
        }
    },

    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: [{
          expand: true,
          cwd: 'components/jade/',
          src: '**/*.jade',
          dest: 'builds/dev',
          ext: '.html'
        }]
      }
    }, // jade

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
        tasks: ['compass:dev', 'notify:sass'] 
      },

      compileHtml: {
        files: ['components/jade/*.jade'],
        tasks: ['jade']
      },

      js: {
        files: ['components/js/**/*.js'],
        tasks: ['browserify:dev']
      }

    
    } // watch
  }); // initConfig
  
  grunt.registerTask('default', ['watch']);

}; // exports

