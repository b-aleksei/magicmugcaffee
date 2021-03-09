const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'build'),
  static: path.resolve(__dirname, 'src/static'),
};

module.exports = {
  context: PATHS.src,
  mode: process.env.NODE_ENV,
  entry: {
    main: './index.js',
  },
  output: {
    filename: 'js/' + fileName('js'),
    path: PATHS.dist,
	  // publicPath: "/",
  },
  // devtool: isDev ? 'cheap-module-source-map' : false,
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    // writeToDisk: true,
    contentBase: PATHS.dist,
    open: isDev,
	  compress: true,
    port: 8081,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
        new CopyPlugin({
      patterns: [
        {from: PATHS.static, to: PATHS.dist},
        {from: PATHS.src + '/data', to: PATHS.dist + '/data'},
      ],
    }),
  ],
  resolve: {
    // extensions: ['.js'],
    alias: {
      '@': PATHS.src,
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev,
            },
          },
	        {loader: 'css-loader', options: {sourceMap: isDev}},
	        {loader: 'postcss-loader', options: {sourceMap: isDev}},
	        {loader: 'sass-loader', options: {sourceMap: isDev}},
        ],
      },
      {test: /\.js$/i,
        exclude: /node_modules/,
	      loader: 'babel-loader',
      },
	    {
		    test: /\.html$/i,
		    include: PATHS.src,
		    loader: 'html-loader',
	    },
	    {
		    test: /\.(woff(2)?|ttf|eot)$/i,
		    loader: "file-loader",
		    options: {
			    name: "[path][name].[ext]"
		    }
	    },
	    {
		    test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
		    use: [
			    {
				    loader: "file-loader",
				    options: {
					    name: isDev ? "[path][name].[ext]" : "[path][name].[contenthash:8].[ext]",
				    }
			    },
			    // 'image-webpack-loader'  // for production mode
		    ]
	    },
	    {
		    test: /\.json$/i,
		    loader: "file-loader",
		    options: {
			    name: "[path][name].[ext]"
		    }
	    },
    ],
  },
};

