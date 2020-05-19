<template>
    <div class="header-bar headColor">
        <img class="header-bar-logo" :src="Logo" />
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Logo from '@/assets/images/logo.png'
export default {
  name: 'HeaderBar',
  components: {},
  data () {
    return {
      Logo
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="less">
.header-bar{
  width: 100%;
  height: 100%;
  padding:0 25px;
  position: relative;
    .custom-content-con{
    float: right;
    height: auto;
    line-height: 64px;
    & > *{
      float: right;
    }
  }
}
</style>
