export default {
  // 设置要全局访问的state对象
  state: {
    widthNum: 270, // 左侧菜单的宽度
    historyList: [
      // {
      //   name: '',
      //   path: ''
      // }
    ]
  },
  mutations: {
    changeSileWidth (state, statewidth) {
      state.widthNum = statewidth
    },
    changeHistoryList (state, list) {
      state.historyList = list
    }
  },
  getters: {
    widthNums: state => state.widthNum,
    historyLists: state => state.historyList
  },
  actions: {

  }
}
