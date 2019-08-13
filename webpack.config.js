const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',

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
  ],
}
