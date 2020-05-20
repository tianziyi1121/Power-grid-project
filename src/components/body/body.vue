<template>
  <Layout class="body-layout-con">
    <Sider
      hide-trigger
      collapsible
      :width="widthNums"
      :collapsed-width="64"
      class="left-sider"
      :style="{ overflow: 'hidden' }"
    >
      <SideMenu @on-select="turnToPage" />
    </Sider>
    <Content class="body-wrapper bg-gray">
      <MenuTag />
      <div class="inner-height mrg4-8">
        <!-- 这里是title -->
        <div class="inner-w">
          <router-view />
        </div>
      </div>
    </Content>
  </Layout>
</template>
<script>
import SideMenu from "./components/side-menu.vue";
import MenuTag from "./components/menu-tag.vue";
import { mapGetters } from "vuex";
export default {
  name: "Body",
  components: {
    SideMenu,
    MenuTag
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["widthNums"])
  },
  methods: {
    turnToPage(name) {
      console.log(name, 12121);
      return;
      this.$router.push(`/${name}`);
    },
    handle(...p) {
      console.log(p);
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@import url("./body.less");
</style>
