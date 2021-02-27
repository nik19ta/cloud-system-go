const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, "public"),
	mode: "development", //production
	entry: {
		main: './js/main.js'
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "build")
	},

	plugins: [
		new HTMLWebPackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyWebPackPlugin({
			patterns: [
				{
					from: "images",
					to: "images"
				},
				{
					from: "css",
					to: "css"
				}
			],
		})
	],
	resolve: {
		alias: {
			'@js': path.resolve(__dirname, "public/js"),
			'@css': path.resolve(__dirname, "public/css"),
			'@img': path.resolve(__dirname, "public/images")
		}
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg)$/,
				use: ['file-loader']
			}
		]
	}
}
