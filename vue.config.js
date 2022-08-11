const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Inform Me',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',

    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'src/service-worker.js',
    // }
  }
})

