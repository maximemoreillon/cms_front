var webpack = require('webpack');

module.exports = {
  devServer: {
      disableHostCheck: true,
      host: '0.0.0.0'
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
}
