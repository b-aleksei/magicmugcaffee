const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
/*const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};*/

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'build'),
  static: path.resolve(__dirname, 'src/static'),
	fonts: path.resolve(__dirname, 'src/fonts'),
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    main: './index.js',
  },
  output: {
    filename: 'js/' + fileName('js'),
    path: PATHS.dist,
	  publicPath: "/"
  },
  devtool: isDev ? 'cheap-module-source-map' : false,
  devServer: {
    writeToDisk: true,
    contentBase: PATHS.dist,
    open: isDev,
    port: 8081,
    // hot: isDev,
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
      ],
    }),
/*	  new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),*/
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
          'css-loader',
          'sass-loader',
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
		    // loader: 'file?prefix=fonts/'
		    options: {
			    name: "[path][name].[ext]"
		    }
	    },
	    {
		    test: /\.(png|jpe?g|gif|svg|webp)$/i,
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

