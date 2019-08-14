const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Critters = require('critters-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')

const BASE_URL = './src'

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
    hints: 'warning',
  }, // https://webpack.js.org/configuration/performance/

  devServer: {
    hot: true,
    writeToDisk: true,
    watchContentBase: true,
    contentBase: [path.join(__dirname, 'public/static')],
    compress: true,
    port: 9000
  },

  entry: {
    main: [`${BASE_URL}/javascript/main.js`, `${BASE_URL}/styles/main.scss`],
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
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${BASE_URL}/views/index.pug`,
      excludeAssets: [/main.*.js/, /style.*.css/]
    }),

    new HtmlWebpackExcludeAssetsPlugin(),

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

    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),

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
