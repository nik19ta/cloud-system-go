const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, "public"),
	mode: "production", //production
	performance: {
    	hints: false,
  	},
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		minimize: true,
		minimizer: [
			  new CssMinimizerPlugin(),
		],
	},
	entry: {
		main: './js/Main.js'
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
			patterns: [{
				from: "images",
				to: "images"
			}],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
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
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg)$/,
				use: ['file-loader']
			}
		]
	}
}
