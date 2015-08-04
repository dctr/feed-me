module.exports = function Gruntfile(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['src/**.js']
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/app.js': 'src/app.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'eslint',
    'babel'
  ]);
};
