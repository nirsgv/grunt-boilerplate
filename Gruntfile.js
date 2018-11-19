'use strict';
const grunt = require('grunt');

grunt.initConfig({
   //put somthing here

    pkg: grunt.file.readJSON('package.json'),
    clean: {
       // output: ['ToBeCleaned/*']
        options: {
        },
        files: ['./js_hint_reports/*.*'],
        folders: ['./js_hint_reports'], // by deleting the forward slash, this tells the clean plugin- this is a folder, delete it
    },
    jshint: {
        options: {
            //force: true,  // will force to continue without breaking even if there are errors
            //'-W069': false,  // a jshint specific error, failure due to the way typescript works w/ enums
            //'-W004': false,  // a jshint specific error, failure due to typescript inheritance
            //ignores: ['./src/js/main.js'], // ignores array is provided to include whole files to ignore
            reporterOutput: './js_hint_reports/jshint.txt',
        },
        files: ['./src/js/*.js']
    },
    uglify: {
        development: {
          files: [{
              expand: true,
              cwd: './src/js/', // cwd: current working directory
              src: '**/*.js', // src: what to scan
              dest: './dest/js/min.js', // dest: destination folder
          }],
        },
        options: {
            mangle: false, // original variable and method names will be renamed to short non-human-readable format
            compress: {
                drop_console: false // will drop console commands from output
            },
            beautify: false, // mainly for debugging, the files will compress but will do it in a non-ugly way
        }
    },
    htmlhint: {
        templates: {
            options: {
                'attr-lower-case': true,
                'attr-value-not-empty': true,
                'tag-pair': true,
                'tag-self-close': true,
                'tagname-lowercase': true,
                'id-class-value': true,
                'id-class-unique': true,
                'src-not-empty': true,
                'img-alt-required': true,
            },
            src: ['./src/*.html']
        },
    },
    htmlmin: {
        dev: {
            options: {
                removeEmptyAttributes: true,
                removeEmptyElements: true,
                removeRedundantAttributes: true,
                removeComments: true,
                removeOptionalTags: true,
                collapseWhitespace: true,
            },
            //files: {'./src/index.min.html': ['./src/*.html']}
            files: [{
                expand: true,
                cwd: './src/',
                dest: './dest/',
                src: ['./*.html'], // providing a pattern, indicating the files we care about
                ext: '.min.html', // providing an output extension for our newly created files
                extDot: 'last', // used to indicate where the period indicating the extension is located (first or last)
            }]
        },
    },
    sass: {                              // Task
        dist: {                            // Target
            options: {                       // Target options
                style: 'compressed', // Output style. Can be nested, compact, compressed, expanded.
                trace: true, //
            },
            files: {                         // Dictionary ozzf files
                'src/css/main.css': 'src/scss/style.scss'      // 'destination': 'source'
            }
        }
    },
    csslint: {
      strict: {
          options: {

          },
          src: ['src/css/main.css']
      },
      laxed: {
        options: {
            'zero-units': true,
            'empty-rules': true,
            'outline': true,
            'universal-selector': true,
        },
          //src: ['src/css/main.css']
          src: ['src/css/*.css']
      },
    },
    cssmin: {
      min: { // configuration for a single file
          options: {
            'report': 'gzip'
          },
          files: {
              'dest/css/min/main.min.css': ['src/css/main.css']
          }
      },
      //   minify: { // configuration for multi files
      //     expand: true,
      //     cwd: 'src/css/',
      //     src: ['src/css/*.css','!*.min.css'],
      //     dest: 'dest/css/min/',
      //     ext: '.min.css',
      //     extDot: 'last'
      // },
      //   concat: { // configuration for multi files
      //           options: {
      //           },
      //           files: {
      //               'dest/css/min/main.min.css': 'src/css/*.css'
      //           }
      // },
    },
    watch: {
        scripts: {
            files: ['src/js/*.js','src/scss/spec/*.scss'],
            tasks: ['clean', 'jshint', 'uglify', 'htmlhint', 'htmlmin', 'sass', 'csslint', 'cssmin'],
            options: {
                spawn: false,
               // livereload: 1337,
            },
        },
    },
});


// load packages
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-htmlhint');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');


// register tasks
grunt.registerTask('default', [
        'clean', 'jshint', 'uglify', 'htmlhint', 'htmlmin', 'sass', 'csslint', 'cssmin', 'watch'
    ]
);


// extand
