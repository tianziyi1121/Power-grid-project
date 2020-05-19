<template>
    <Layout class="body-layout-con">
        <Sider hide-trigger collapsible :width="widthNums" :collapsed-width="64" class="left-sider" :style="{overflow: 'hidden'}">
            <SideMenu @on-select="turnToPage" />
        </Sider>
        <Content class="body-wrapper bg-gray">
            <MenuTag />
            <div class="inner-height inner-bg">
                <!-- 这里是title -->
                <router-view />
            </div>
        </Content>
    </Layout>
</template>
<script>
import SideMenu from './components/side-menu.vue'
import MenuTag from './components/menu-tag.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Body',
  components: {
    SideMenu,
    MenuTag
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['widthNums'])
  },
  methods: {
    turnToPage (name) {
      console.log('------route------', name)
      this.$router.push(`/${name}`)
    },
    handle (...p) {
      console.log(p)
    }
  },
  watch: {},
  mounted () { }
}
</script>
<style lang="less" scoped>
@import url('./body.less');
.bg-gray{
    background: #f5faff;
}
.inner-bg {
    background: url('../../assets/images/transtion.png') no-repeat right bottom;
}
</style>
