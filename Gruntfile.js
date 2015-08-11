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
      clean: ["dist"],
      copy: {
        markup: {
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
      watch: {
        bower: {
          files: ['bower.json'],
          tasks: ['wiredep']
        },
        gruntfile: {
          files: ['Gruntfile.js']
        },
        livereload: {
          files: ['dist/**/*'],
          options: {
            livereload: true
          }
        },
        markup: {
          files: ['src/**/*.html'],
          tasks: ['copy:markup', 'wiredep']
        },
        scripts: {
          files: ['src/**/*.js'],
          tasks: ['babel']
        }
      },
      wiredep: {
        task: {
          src: ['dist/**/*.html']
        }
      }
    }
  );

  grunt.registerTask(
    'build', [
      'clean',
      'copy',
      'babel',
      'wiredep'
    ]
  );

  grunt.registerTask(
    'develop',
    [
      'build',
      'watch'
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
