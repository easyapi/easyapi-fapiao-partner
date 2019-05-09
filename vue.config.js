const path = require('path')

module.exports = {

  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: false,
  //运行服务配置 host、port 和 https
  devServer: {
    port: '9999'
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `@import "@/assets/styles/colors.scss";`
      }
    }
  },

}

