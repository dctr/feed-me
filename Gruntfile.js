module.exports = function Gruntfile(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig(
    {
      babel: {
        options: {
          modules: 'system',
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
      bower_main: {
        copy: {
          options: {
            dest: 'dist/bower_components'
          }
        }
      },
      clean: ["dist"],
      copy: {
        markup: {
          files: [
            {
              expand: true,
              cwd: 'src/',
              src: ['**/*.html', '**/*.css'],
              dest: 'dist/'
            }
          ]
        }
      },
      eslint: {
        target: ['src/**.js']
      },
      wiredep: {
        task: {
          src: ['dist/**/*.html'],
          ignorePath: /\.\.\//
        }
      }
    }
  );

  grunt.registerTask(
    'build', [
      'clean',
      'babel',
      'bower_main',
      'copy',
      'wiredep'
    ]
  );

  grunt.registerTask(
    'test', [
      'eslint'
    ]
  );

  grunt.registerTask(
    'default', [
      'test',
      'build'
    ]
  );
};
