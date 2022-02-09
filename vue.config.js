module.exports = {
  lintOnSave: false,
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
};
