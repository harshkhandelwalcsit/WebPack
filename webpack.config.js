var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModules = {};

fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

var webpackConfig = {
	entry: {
		app: './app/app.module.js'
	},
	target: 'web',
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js'
	},
	module: {
		loaders: [{
			test: /jquery\.js$/,
			loader: 'expose?jQuery'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ["babel-loader?presets=es2015"]

		}, {
			// ASSET LOADER
			test: /\.(woff|woff2|ttf|eot)$/,
			loader: 'file?name=[path][name].[ext]'
		}, {
			//IMAGE LOADER
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'file?name=[path][name].[ext]'
				//loader:'url?name=[path][name].[ext]'
		}, {
			//CSV LOADER
			test: /\.csv$/,
			loader: 'file?name=[path][name].[ext]'
				//loader:'url?name=[path][name].[ext]'
		}, {
			// HTML LOADER
			test: /\.html$/,
			loader: 'html-loader'
		}, {
			//SCSS LOADER
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
				//loaders: ["style", "css", "sass?indentedSyntax"]
		}, {
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}]
	},
	//externals: nodeModules,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './app/index.html',
			favicon: './assets/img/logo.ico',
			inject: 'body',
			minify: false
		}),
		new ExtractTextPlugin('[name].css', {
			disable: false
		}),
        new webpack.EnvironmentPlugin(["ANK_SCHOOL"])
	],
	devtool: 'sourcemap'
};

module.exports = webpackConfig
