/* eslint-env node */
/* eslint no-console: 0 */
import {resolve, relative} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default ()=> ({
  mode: 'development',
  entry: {
    example: resolve(__dirname, 'src', 'example', 'index.js')
  },

  output: {
    publicPath: '/maps/',
    path: resolve(__dirname, 'build/pkg'),
    filename: '[name]-[contenthash].js',
    // improve paths in devtools
    devtoolModuleFilenameTemplate: (info)=> (
      `webpack:///${relative(__dirname, info.absoluteResourcePath)}`
    )
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'example', 'index.html')
    })
  ],

  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader'
    }, {
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }, {
      test: /\.(png|jpg|ico|gif)$/,
      loader: 'url-loader?limit=1'
    }, {
      test: /\.jsx?$/,
      include: [
        resolve(__dirname, 'node_modules/ol'),
        resolve(__dirname, 'node_modules/react-entry-loader'),
        resolve(__dirname, 'node_modules/refocus'),
        resolve(__dirname, 'src')
      ],
      loader: 'babel-loader',
      options: {
        // making sure babel gets the right environment and thus
        // picks up the correct config.
        envName: 'webpack-dev'
      }
    }]
  },
  // devtool: '#cheap-module-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    stats: 'minimal',
    contentBase: './build',
    publicPath: `/maps/`,
    historyApiFallback: {
      index: `/maps/`
    }
  }
});
