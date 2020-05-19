const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : ''

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  // baseUrl: BASE_URL,
  publicPath: BASE_URL,
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'dist',
  // 存放静态资源的目录
  assetsDir: 'static',
  // html输出路径
  indexPath: 'index.html',
  // pages:{ type:Object,Default:undfind }
  /*
  构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
  个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
  的字符串，
  注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  */
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      title: '国网冀北电力物资调配平台'
    }
  },
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // transpileDependencies: ['tree-table-vue', 'iview'],
  chainWebpack: config => {
    config.entry('polyfill').add('@babel/polyfill')
    config.resolve.symlinks(true)
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', 'src/assets')
  },
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串

  // const publicURLAA = '/newmdpa' // 根路径  39.98.113.250:8303（供应链协同）
  // const publicURLBB = '/newmdpb' // 根路径  39.98.113.250:8300（智能采购）
  // const publicURLCC = '/newmdpc' // 根路径  39.98.113.250:8302（全景质控）
  // const publicURLDD = '/newmdpd' // 根路径  39.98.113.250:8308 （国网相关相对独立的功能合集微服务）
  // const publicURLEE = '/newmdpe' // 根路径  39.98.113.250:8306 （common）
  // const publicURLFF = '/newmdpf' // 根路径  39.98.113.250:8301（数字物流）
  // const publicURLGG = '/newmdpg' // 根路径  39.98.113.250:8304 （运营监督）
  // const publicURLHH = '/newmdph' // 根路径  39.98.113.250:8305 （辅助功能）
  // const publicURLMM = '/newmdpm' // 根路径  39.98.113.250:8307  (用户管理微服务)

  devServer: {
    open: true, //浏览器自动打开页面
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 8080,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      //配置跨域
      '/api': {
        target: "http://47.92.127.132:18888",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
      // '/newmdpa': {
      //   target: 'http://39.98.113.250:8303',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpa': '/'
      //   }
      // },
      // '/newmdpb': {
      //   target: 'http://39.98.113.250:8300',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpb': '/'
      //   }
      // },
      // '/newmdpc': {
      //   target: 'http://39.98.113.250:8309',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpc': '/'
      //   }
      // },
      // '/newmdpd': {
      //   target: 'http://39.98.113.250:8308',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpd': '/'
      //   }
      // },
      // '/newmdpe': {
      //   target: 'http://39.98.113.250:8306',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpe': '/'
      //   }
      // },
      // '/newmdpf': {
      //   target: 'http://39.98.113.250:8301',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpf': '/'
      //   }
      // },
      // '/newmdpg': {
      //   target: 'http://39.98.113.250:8304',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpg': '/'
      //   }
      // },
      // '/newmdph': {
      //   target: 'http://39.98.113.250:8305',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdph': '/'
      //   }
      // },
      // '/newmdpk': {
      //   target: 'http://39.98.113.250:8302',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpk': '/'
      //   }
      // },
      // '/newmdpm': {
      //   target: 'http://39.98.113.250:8307',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/newmdpm': '/'
      //   }
      // }


    }
  },
  css: {
    // css 地图导航
    sourceMap: true
  }
}
