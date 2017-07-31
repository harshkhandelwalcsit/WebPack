var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

webpackConfig.output.filename = '[name].bundle.min.js';
webpackConfig.plugins.push(
	new WebpackCleanupPlugin({
		exclude: []
	}), new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		//beautify: true,
		mangle: false
	}),
	new webpack.optimize.DedupePlugin()
);

module.exports = webpackConfig;