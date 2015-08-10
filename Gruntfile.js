module.exports = function Gruntfile(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
    wiredep: {
      task: {
        src: ['dist/**/*.html']
      }
    }
  });

  grunt.registerTask('test', [
    'eslint'
  ])

  grunt.registerTask('build', [
    'clean',
    'copy',
    'babel',
    'wiredep'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
