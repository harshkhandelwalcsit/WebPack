var webpackConfig = require('./webpack.config');

webpackConfig.DEV = true;
webpackConfig.devServer = {
	contentBase: './dist',
	hot: true,
	stats: {
		modules: false,
		cached: false,
		colors: true,
		chunk: false
	}
};

module.exports = webpackConfig;