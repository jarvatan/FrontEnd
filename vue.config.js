module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  // outputDir: 'dist',
  // pages:{ type:Object,Default:undfind }
  devServer: {
    port: 8085, // 端口号
    disableHostCheck: true,
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
  }
}
