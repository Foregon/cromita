const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Critters = require('critters-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  performance: {
    maxAssetSize: 100000,
    maxEntrypointSize: 100000,
    hints: 'warning',
  }, // https://webpack.js.org/configuration/performance/

  entry: {
    main: ['./src/javascript/main.js', './src/styles/main.scss'],
  },

  output: {
    path: path.resolve(__dirname, './public/static/'),
    filename: 'js/[name].js',
    publicPath: '/static/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false, // set to false if you want CSS source maps
        },
      },
    }),

    new BundleAnalyzerPlugin(),

    new Critters(),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
  },
}
