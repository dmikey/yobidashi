module.exports = function(grunt) {
//install closure compiler on OSX
//brew install closure-compiler
//run "brew --prefix closure-compiler" to obtain path
    grunt.initConfig({
        'closure-compiler': {
            frontend: {
                    closurePath: '/usr/local/opt/closure-compiler/libexec',
                    js: 'src/yobidashi.js',
                    jsOutputFile: 'build/yobidashi.min.js',
                    maxBuffer: 500,
                    noreport: true,
                    options: {
                        compilation_level: 'SIMPLE_OPTIMIZATIONS',
                        language_in: 'ECMASCRIPT5_STRICT'
                    }
                }
            }
    });

    grunt.loadNpmTasks('grunt-closure-compiler');
    
    grunt.registerInitTask('default', 'run the full build process', [
        'closure-compiler'
    ]);

};