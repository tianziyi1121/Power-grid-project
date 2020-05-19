import * as d3 from 'd3'
import {
  getHomeRoute,
  localRead
} from '@/libs/util'
import { getMenuData, getTagVersion, getTagData } from '@/api/data'
// import router from '@/router'
// import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    permissionStr: ['1', '2', '3', '4', '5'], // 权限数组 这个数据需要从后台获取
    menuList: [], // 菜单
    tagVersion: 0, // 字典表版本
    tagData: d3.map(), // 客户端缓存字典表数据
    // serverTagRequest: {},
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    permissionStr: (state) => state.permissionStr,
    tagData: (state) => state.tagData,
    menuList: (state) => state.menuList,
    errorCount: state => state.errorList.length
  },
  mutations: {
    setTagData (state, tagData) {
      state.tagData = d3.map(tagData, d => d.codeType)
    },
    setTagVersion (state, tagVersion) {
      state.tagVersion = tagVersion
    },
    setMenuList (state, menuList) {
      state.menuList = menuList
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    // 获取菜单
    getMenuData ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getMenuData(state.token).then(res => {
            commit('setMenuList', res.data.nodeList)
            resolve(res.data.nodeList)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取最新版本 getTagVersion,getTagData
    getTagData ({ state, commit }) {
      const TagCache = window.localStorage.getItem('TagCodeTypeList')
      if (!TagCache) {
        // 缓存内没有字典表
        return new Promise((resolve, reject) => {
          try {
            getTagData(state.token).then(res => {
              window.localStorage.setItem('TagCodeTypeList', JSON.stringify(res.data))
              commit('setTagData', res.data.codeTypeList)
              resolve(res.data)
            }).catch(err => {
              reject(err)
            })
          } catch (error) {
            reject(error)
          }
        })
      }
      // 已经存在字典表
      const { version, codeTypeList } = JSON.parse(TagCache)
      return new Promise((resolve, reject) => {
        try {
          // 获取服务器端字典表版本号
          getTagVersion(state.token).then(res => {
            // commit('setTagVersion', res.data.version)
            if (version !== res.data.version) {
              // 加载新的字典表
              return new Promise(() => {
                getTagData(state.token).then(res => {
                  window.localStorage.setItem('TagCodeTypeList', JSON.stringify(res.data))
                  commit('setTagData', res.data.codeTypeList)
                  resolve(res.data)
                }).catch(err => {
                  reject(err)
                })
              })
            } else {
              // 直接从缓存读取
              commit('setTagData', codeTypeList)
            }
            resolve(res.data.version)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
