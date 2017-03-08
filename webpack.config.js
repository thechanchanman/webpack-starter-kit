var ExtractTextPlugin = require('extract-text-webpack-plugin');

function entrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.unshift('webpack-dev-server/client?http://localhost:8080');
    sources.unshift('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  entry: {
    main: entrySources([
      './src/js/app.js',
      './src/scss/styles.scss'
    ])
  },
  output: {
    filename: './dist/js/build.js'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'source-map',
  module: {
    rules: [
      { // js files
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude all files in the node_modules folder
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      { // regular css files
        test: /\.css$/, // include .css files
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/, // include .scss and .sass files
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/css/[name].bundle.css',
      allChunks: true,
    }),
  ]
};
