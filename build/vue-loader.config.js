// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //remove the space
    extractCSS: !isDev, //parse css in vue, so that it can be packaged with ExtractPlugin
    // cssModules: {},
    // hotReload: false, //Generation based on environmental variables
    // loader: {
    //   'docs': docsLoader
    // } Custom the vue module
    // preLoader: {}, //before vue-loader analysis
    // postLoader:{}, //before vue-loader analysis
  }
}