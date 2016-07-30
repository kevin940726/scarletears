/* eslint-disable global-require */
const path = require('path');

module.exports = {
	module: {
		loaders: [{
			// Do not transform vendor's CSS with CSS-modules
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader'],
			include: path.join(__dirname, '../node_modules'),
		}, {
			test: /\.global\.css$/,
			loader: 'style-loader!css-loader!postcss-loader',
			include: path.join(__dirname, '../src'),
		}, {
			test: /^((?!\.global).)*\.css$/,
			loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader', // eslint-disable-line max-len
			include: path.join(__dirname, '../src'),
		}, {
			test: /\.(jpg|png|gif)$/,
			loaders: [
				'file-loader?name=./assets/[name]__[hash].[ext]',
				'image-webpack?{progressive:true, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
			],
			include: path.join(__dirname, '../src'),
		}, {
			test: /\.(mp3|ogg|mp4)$/,
			loader: 'file-loader?name=./assets/[name].[ext]',
			include: path.join(__dirname, '../src'),
		}],
	},
	postcss(webpack) {
		return [
			require("postcss-import")({
				addDependencyTo: webpack,
			}),
			require("postcss-url")(),
			require("precss")(),
			require("postcss-cssnext")(),
			require("postcss-browser-reporter")(),
			require("postcss-reporter")(),
		];
	},
};
