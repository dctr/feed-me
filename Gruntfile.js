module.exports = function Gruntfile(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'dist/'
          }
        ]
      }
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    eslint: {
      target: ['src/**.js']
    },
  });

  grunt.registerTask('default', [
    'eslint',
    'copy',
    'babel'
  ]);
};
