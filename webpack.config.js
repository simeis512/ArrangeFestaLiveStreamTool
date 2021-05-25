const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: {
    app: ['./src_client/index.js']
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: "/js/",
    filename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['pug-plain-loader']
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ]
}
