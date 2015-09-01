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
                title: 'Sass',
                message: 'Sass task complete'
            } 
        },

        jade: {
            options: {
                title: 'Jade',
                message: 'Jade compiled'
            }
        },

        browserify: {
            options: {
                title: 'Browserify',
                message: 'Browserified!'
            }
        }
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
            options: {
                require: [ ['./components/js/main.js', {expose: 'app'} ] ]
                //alias: ['app:'],
                //external: ['app:']     
            },
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
        tasks: ['jade', 'notify:jade']
      },

      js: {
        files: ['components/js/**/*.js'],
        tasks: ['browserify:dev', 'notify:browserify']
      }

    
    } // watch
  }); // initConfig
  
  grunt.registerTask('compile sass', ['compass:dev', 'notify:sass']);
  grunt.registerTask('compile jade', ['jade', 'notify:jade']);
  grunt.registerTask('compile js', ['browserify:dev', 'notify:browserify']);
  grunt.registerTask('default', ['watch']);

}; // exports

