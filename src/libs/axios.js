import axios from 'axios'
import { Notice } from 'iview'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  // 统一添加请求参数
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl, // axios.create 参数 baseUrl将被添加到`url`前面，除非`url`是绝对的。
      timeout: 7000, // 请求超时时间
      headers: {
        // 这里可以添加统一的header 如JWT登录
        // COP_Authorization: 'Bearer ' + getToken()
        // token : sessionStorage.getItem( 'token' )
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  // 请求、响应拦截
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) { // Object.keys获取队列里的属性名 如果队列里面没有请求，就添加loading...
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      // if ( config.data.constructor === Object ) {
      //   for ( let i in config.data ) {
      //     config.data[i] = config.data[i] == 'undefined' ? '' : config.data[i]
      //   }
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      if (res && res.data) {
        switch (res.data.code) {
          case '0000':
            return res.data
          case '0001':
            // 参数失败
            Notice.error({
              title: res.data.message,
              desc: '',
              duration: 0
            })
            break
          case '1002':
            // 链接失败
            Notice.error({
              title: res.data.message,
              desc: '',
              duration: 0
            })
            break
          case '1003':
            // 链接超时
            Notice.error({
              title: res.data.message,
              desc: '',
              duration: 0
            })
            break
          case '9999':
            return res.data
          default:
          // 未知错误
        }
      }
    }, error => {
      this.destroy(url)
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误,未找到该资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持该请求'
            break
          default:
            error.message = `连接错误${error.response.status}`
        }
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
