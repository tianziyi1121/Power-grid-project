<template>
    <Layout class="main">
        <Header class="header">
            <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                <Back></Back>
                <user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
                <navigation @on-select="turnToPage" />
            </header-bar>
        </Header>
        <Content class="main-body">
            <Layout class="main-content">
                <Content class="content-wrapper">
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </Content>
            </Layout>
        </Content>
    </Layout>
</template>
<script>
import HeaderBar from './components/header-bar'
import Navigation from './components/navigation'
import User from './components/user'
import Back from './components/back'
export default {
  name: 'Main',
  components: {
    HeaderBar,
    Navigation,
    User,
    Back
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  computed: {
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    turnToPage (route) {
      if (!window.location.href.includes(route)) {
        this.$router.push(`/${route}`)
      }
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.main{
  height:100%;
  .header{
    padding: 0;
    width: 100%;
  }
  .main-body{
    // height: 100%;
    height: ~"calc(100% - 64px)";
  }
  .main-content{
    // height: ~"calc(100% - 60px)";
    height:100%;
  }
  .content-wrapper{
    height:100%;
  }
}
</style>
