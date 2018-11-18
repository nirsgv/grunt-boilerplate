'use strict';
const grunt = require('grunt');

grunt.initConfig({
   //put somthing here

    pkg: grunt.file.readJSON('package.json'),
    clean: {
        output: ['ToBeCleaned/*']
    },
    jshint: {
        options: {
            //force: true,  // will force to continue without breaking even if there are errors
            //'-W069': false,  // a jshint specific error, failure due to the way typescript works w/ enums
            //'-W004': false,  // a jshint specific error, failure due to typescript inheritance
            //ignores: ['./src/js/main.js'], // ignores array is provided to include whole files to ignore
            reporterOutput: './jshint.txt',
        },
        files: ['./src/js/*.js']
    },
    uglify: {
        development: {
          files: [{
              expand: true,
              cwd: './src/js/', // cwd: current working directory
              src: '**/*.js', // src: what to scan
              dest: './dest/js/', // dest: destination folder
          }],
        },
        options: {
            mangle: false, // original variable and method names will be renamed to short non-human-readable format
            compress: {
                drop_console: true // will drop console commands from output
        },
    }
});


// load packages


grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
// register tasks
grunt.registerTask('default', [
        'clean', 'jshint', 'uglify'
    ]
);


// extand
