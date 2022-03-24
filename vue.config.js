const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要哪些文件自动引入 ,使用绝对路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variable.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
