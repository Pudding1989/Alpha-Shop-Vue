module.exports = {
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Alpha-Shop-Vue' : '/',
  // 引入全局變數
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "/src/styles/variables.scss";
        `
      }
    }
  }
}
