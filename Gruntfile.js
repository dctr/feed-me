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
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'src/',      // Src matches are relative to this path.
            src: ['**/*.js'], // Actual pattern(s) to match.
            dest: 'dist/',   // Destination path prefix.
          },
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'eslint',
    'babel'
  ]);
};
