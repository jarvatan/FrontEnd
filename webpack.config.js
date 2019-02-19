const path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production', // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: './src/main.js', // string | object | array  // 默认为 ./src
  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, 'dist'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: '[name].bundle.js', // string    // 「入口分块(entry chunk)」的文件名模板
    publicPath: '/assets/' // string    // 输出解析文件的目录，url 相对于 HTML 页面
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'url-loader', options: { limit: 8192 } }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devServer: {
    // ...
    disableHostCheck: true
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
