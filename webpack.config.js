const path = require("path"),
	webpack = require("webpack"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
	mode: isDev ? "development" : "production",
	entry: {
		app: "./src/index.jsx",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devtool: isDev ? "inline-source-map" : "source-map",
	devServer: {
		static: "./dist",
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve("babel-loader"),
						options: {
							plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "/"
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					// "postcss-loader",
					// "sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx", ".jsx"],
	},
	plugins: [
		...[
			isDev && new webpack.HotModuleReplacementPlugin(),
			isDev && new ReactRefreshWebpackPlugin(),
			!isDev && new MiniCssExtractPlugin()
		].filter(Boolean),
		new HtmlWebpackPlugin({
			template: "public/index.html"
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
