<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import 'babel-polyfill'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  created () {
    // // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }

    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
  },
  beforeMount () {

  },
  mounted () {
    let user = JSON.stringify(
      {
        'id': 1,
        'userid': 'zhangsan',
        'username': '登录人的名字张三',
        'usercode': 'zhangsan',
        'depcode': '登录人的单位',
        'depname': '登录人的单位',
        'position': null,
        'deleteflag': '0',
        'creater': 'W',
        'updater': null,
        'createtime': '2019-12-27 14:12:41',
        'updatetime': '2019-12-27 14:12:44',
        'mobile': '153234567890',
        'email': null,
        'state': '启用',
        'gender': null,
        'password': '123456',
        'pwdmodifiedtime': null,
        'hiretime': null,
        'remark': null,
        'isleader': null,
        'userorder': null
      })
    sessionStorage.setItem('user', user)

    // // 验证用户身份, 是否登录
    // // 左侧菜单
    // const sessionRes = JSON.parse(sessionStorage.getItem('res'))
    // // 角色身份
    // const sessionRole = JSON.parse(sessionStorage.getItem('role'))
    // // 用户身份
    // const sessionUser = JSON.parse(sessionStorage.getItem('user'))
    // // token信息
    // const sessionToken = sessionStorage.getItem('token')
    // this.setRes(sessionRes)
    // this.setRole(sessionRole)
    // this.setUser(sessionUser)
    // this.setToken(sessionToken)
    // if (!this.token) {
    //   this.$router.push('/login')
    // }
  },
  computed: {
    ...mapGetters(['res', 'role', 'user', 'token'])
  },
  methods: {
    ...mapMutations(['setRes', 'setRole', 'setUser', 'setToken'])
  }
}
</script>

<style lang="less">
.size {
    width: 100%;
    height: 100%;
}
html,
body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#app {
    .size;
}
</style>
