const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');


module.exports = function(grunt) {
	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						'process.env': {
							// This has effect on the react lib size
							'NODE_ENV': JSON.stringify('production')
						}
					}),
					new webpack.optimize.UglifyJsPlugin()
				),
				progress: true,
				watch: false,
			},
			'build-dev': {
				//
			}
		},
		'webpack-dev-server': {
			options: {
				webpack: webpackConfig,
				publicPath: '/' + webpackConfig.output.publicPath
			},
			start: {
				webpack: {
					devtool: 'eval'
				}
			},
			//for LAN visit: current laptop IP:8080 or xxx.local:8080
			host : '0.0.0.0'
		},
		clean: {
      script: ['script/*']
    },
		watch: {
			app: {
				files: ['app/**/*', 'web_modules/**/*'],
				tasks: ['webpack:build-dev'],
				options: {
					spawn: false
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

	// The development server (the recommended option for development)
	grunt.registerTask('default', ['webpack-dev-server:start']);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask('dev', ['webpack:build-dev', 'watch:app']);

	// Production build
	grunt.registerTask('build', ['clean:script', 'webpack:build']);
};