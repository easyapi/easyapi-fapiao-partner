const path = require('path')

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // assetsDir: "./",
  publicPath: './',
  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: false,
  //运行服务配置 host、port 和 https
  devServer: {
    port: '9999',
    open: true, //配置自动启动浏览器
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        prependData: `@import "@/assets/styles/colors.scss";`
      }
    }
  },

}

