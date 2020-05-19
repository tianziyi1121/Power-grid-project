import { login, logout } from '@/api/common.js'
import { composeTree } from '@/libs/variable.js'
export default {
  state: {
    avatarImgPath: '',
    // 左侧菜单
    res: [],
    // 左侧菜单tree状数据
    resTree: [],
    // navigation导航信息
    nav: [],
    // navigation导航地图信息
    nameMap: {},
    // 角色身份
    role: [],
    // 用户身份
    user: {},
    // token信息
    token: '',
    access: '',
    unreadCount: 0,
    messageUnreadList: [],
    personState: false, // 个人主页状态
    personInfoState: false, // 个人信息
    safeManagementState: false, // 安全管理
    importantInfoState: false // 重要信息配置
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    activePerson (state, stateBoolean) {
      state.personState = stateBoolean
    },
    showPersonInfo (state, stateBoolean) {
      state.personInfoState = stateBoolean
    },
    showSafeManagement (state, stateBoolean) {
      state.safeManagementState = stateBoolean
    },
    showImportantInfo (state, stateBoolean) {
      state.importantInfoState = stateBoolean
    },
    setRes: (state, payload) => {
      state.res = payload
    },
    setresTree: (state, payload) => {
      state.resTree = payload
    },
    setNav: (state, payload) => {
      state.nav = payload
    },
    setnameMap: (state, payload) => {
      state.nameMap = payload
    },
    setRole: (state, payload) => {
      state.role = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setToken: (state, payload) => {
      state.token = payload
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    personState: state => state.personState,
    personInfoState: state => state.personInfoState,
    safeManagementState: state => state.safeManagementState,
    importantInfoState: state => state.importantInfoState,
    res: state => state.res,
    role: state => state.role,
    user: state => state.user,
    token: state => state.token,
    resTree: state => state.resTree,
    nav: state => state.nav,
    nameMap: state => state.nameMap
  },
  actions: {
    querylogin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          if (res.code === '0000' && res.type === 'success') {
            commit('setRes', res.data.res)
            commit('setRole', res.data.role)
            commit('setUser', res.data.user)
            commit('setToken', res.data.token)
            let resTree = composeTree(res.data.res)
            commit('setresTree', resTree)
            let nameMap = {}
            let nav = []
            resTree.forEach(item => {
              let keyStr = item.URL.split('/')[0]
              nameMap[keyStr] = item.URL
              nav.push({

              })
            })
            commit('setnameMap', nameMap)
            console.log(nameMap)
            resolve(res.data)
          } else {
            reject(res.message)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querylogOut ({ commit }, params) {
      return new Promise((resolve, reject) => {
        logout(params).then(res => {
          if (res.code === '0000' && res.type === 'success') {
            commit('setRes', [])
            commit('setRole', [])
            commit('setUser', {})
            commit('setToken', '')
            resolve(res.data)
          } else {
            reject(res.message)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
