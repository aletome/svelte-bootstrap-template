const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name]-[contenthash].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [{
				test: /\.(scss)$/,
				use: [{
						// inject CSS to page
						loader: 'style-loader'
					},
					{
						// translates CSS into CommonJS modules
						loader: 'css-loader'
					},
					{
						// Run postcss actions
						loader: 'postcss-loader'
					},
					{
						// compiles Sass to CSS
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(html|svelte)$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						// emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin(),
		new CopyPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src', 'favicon.png')
			}, ],
		}),
	],
	devtool: prod ? false : 'source-map'
};