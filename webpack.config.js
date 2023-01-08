const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerCssExtractPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpack = require('terser-webpack-plugin');

const is_dev_mode = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
	splitChunks: {
	  chunks: 'all' // optimization for lib if we import in the diff files
	}
  };

  if (!is_dev_mode) {  //minimize only for prod version
	config.minimize = true;
	config.minimizer = [
	  new CSSMinimizerCssExtractPlugin(),
	  new TerserWebpack()
	]
  }

  return config;
};

const filename = (ext) => is_dev_mode ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoader = exten => {
  const loader = [
	{
	  loader: MiniCssExtractPlugin.loader,
	  options: {},
	},
	'css-loader'
  ];

  if (exten) {
	loader.push(exten);
  }
  return loader;
};

const babel = preset => {
  const config = {
	loader: "babel-loader",
	options: {
	  presets: ['@babel/preset-env']
	},
  };

  if (preset) {
	config.options.presets.push(preset)
  }

  return [config];
};

module.exports = {
  context: path.resolve(__dirname, 'src'), // point from
  mode: 'development',
  entry: {
	main: './index.js',
	analytics: './analytics.ts'
  },
  output: {
	filename: filename('js'),
	path: path.resolve(__dirname, 'dist'),
	clean: true
  },
  resolve: {
	extensions: ['.js', '.png', '.json', '.xml'] // import without .json
	// alias: {} - describe the paths for imports
  },
  optimization: optimization(),
  devServer: {  // reload after we will change some
	static: {
	  directory: path.join(__dirname, 'src'),
	},
	compress: true,
	port: 9000,
	open: true,
  },
  plugins: [
	new HTMLWebpackPlugin({
	  template: "./index.html",
	  minify: {
		collapseWhitespace: !is_dev_mode
	  }
	}),
	new CopyWebpackPlugin({ // copy all files, folder to the dist
	  patterns: [
		{
		  from: path.resolve(__dirname, 'src/favicon.ico'),
		  to: path.resolve(__dirname, 'dist')
		}
	  ]
	}),
	new MiniCssExtractPlugin({
	  filename: filename('css'),
	}),
  ],
  module: {
	rules: [
	  {
		test: /\.css$/,
		use: cssLoader()
	  },
	  {
		test: /\.less$/,
		use: cssLoader('less-loader')
	  },
	  {
		test: /\.s[ac]ss$/,
		use: cssLoader('sass-loader')
	  },
	  {
		test: /\.(png|jpeg|svg)$/,
		type: 'asset/resource'
	  },
	  {
		test: /\.(ttf|woff|woff2|eot)/, // fonts
		type: 'asset/resource'
	  },
	  {
		test: /\.xml$/,
		use: ['xml-loader']
	  },
	  {
		test: /\.csv$/,
		use: ['csv-loader']
	  },
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		use: babel()
	  },
	  {
		test: /\.ts$/,
		exclude: /node_modules/,
		use: babel('@babel/preset-typescript')
	  }
	]
  }
};
