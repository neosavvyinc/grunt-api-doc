/*
 * grunt-api-doc
 * https://github.com/trevorewen/grunt-api-doc
 *
 * Copyright (c) 2013 Trevor Ewen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('apidoc', 'Generate interactive API docs for your services.', function () {
        if (true) {
            var template = require('./lib/template');

            if (!this.data.src || !this.data.dest) {
                throw new Error("You must pass a src and dest parameter for the grunt-api-doc task.");
            }

            var apiConfig = JSON.parse(grunt.file.read(this.data.src));

            var methodBlocks = "";
            if (apiConfig.methods && apiConfig.methods.length) {
                var nsApiTemplate = grunt.file.read('tasks/assets/templates/ns-api.html');
                apiConfig.methods.forEach(function(method) {
                    methodBlocks += template.hashToTemplate(nsApiTemplate, method) + "\n";
                });
            }
            console.log(methodBlocks);
        } else {

            // Merge task-specific and/or target-specific options with these defaults.
            var options = this.options({
                punctuation: '.',
                separator: ', '
            });

            // Iterate over all specified file groups.
            this.files.forEach(function (f) {
                // Concat specified files.
                var src = f.src.filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {
                        // Read file source.
                        return grunt.file.read(filepath);
                    }).join(grunt.util.normalizelf(options.separator));

                // Handle options.
                src += options.punctuation;

                // Write the destination file.
                grunt.file.write(f.dest, src);

                // Print a success message.
                grunt.log.writeln('File "' + f.dest + '" created.');
            });
        }
    });

};